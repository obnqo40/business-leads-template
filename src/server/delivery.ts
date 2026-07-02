import { createEmailAdapter } from "./adapters/email.adapter";
import { createGoogleSheetsAdapter } from "./adapters/google-sheets.adapter";
import { createMaxAdapter } from "./adapters/max.adapter";
import { createTelegramAdapter } from "./adapters/telegram.adapter";
import { redactSecrets } from "./env";
import type { DeliveryAdapter, DeliveryReport, Lead } from "./lead.types";

const ADAPTER_TIMEOUT_MS = 10_000;

function getAdapters(): DeliveryAdapter[] {
  return [
    createTelegramAdapter(),
    createMaxAdapter(),
    createEmailAdapter(),
    createGoogleSheetsAdapter()
  ];
}

function getErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown adapter error";
  return redactSecrets(message).slice(0, 300);
}

async function sendWithTimeout(adapter: DeliveryAdapter, lead: Lead) {
  const controller = new AbortController();
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      controller.abort();
      reject(new Error(`Adapter timed out after ${ADAPTER_TIMEOUT_MS}ms`));
    }, ADAPTER_TIMEOUT_MS);
  });

  try {
    await Promise.race([
      adapter.send(lead, { signal: controller.signal, timeoutMs: ADAPTER_TIMEOUT_MS }),
      timeout
    ]);
    return adapter.name;
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

export async function deliverLead(lead: Lead): Promise<DeliveryReport> {
  const adapters = getAdapters().filter((adapter) => adapter.enabled);

  if (adapters.length === 0) {
    return {
      ok: false,
      total: 0,
      succeeded: [],
      failed: []
    };
  }

  const results = await Promise.allSettled(
    adapters.map((adapter) => sendWithTimeout(adapter, lead))
  );

  const succeeded: DeliveryReport["succeeded"] = [];
  const failed: DeliveryReport["failed"] = [];

  results.forEach((result, index) => {
    const adapter = adapters[index];

    if (result.status === "fulfilled") {
      succeeded.push(result.value);
      return;
    }

    const error = getErrorMessage(result.reason);
    failed.push({ name: adapter.name, error });
    console.error(`Lead delivery failed in ${adapter.name}: ${error}`);
  });

  return {
    ok: succeeded.length > 0,
    total: adapters.length,
    succeeded,
    failed
  };
}
