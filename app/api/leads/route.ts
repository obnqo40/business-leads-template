import { NextResponse } from "next/server";
import { deliverLead } from "@/server/delivery";
import { validateLeadPayload } from "@/server/lead.schema";
import type { DeliveryReport } from "@/server/lead.types";

const MAX_BODY_BYTES = 32_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getPublicDeliveryReport(delivery: DeliveryReport) {
  return {
    ok: delivery.ok,
    total: delivery.total,
    succeeded: delivery.succeeded,
    failed: delivery.failed.map((item) => item.name)
  };
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);

  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, message: "Слишком большой размер заявки." },
      { status: 413 }
    );
  }

  let payload: unknown;

  let rawBody = "";

  try {
    rawBody = await request.text();

    if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { ok: false, message: "Слишком большой размер заявки." },
        { status: 413 }
      );
    }

    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { ok: false, message: "Некорректный JSON." },
      { status: 400 }
    );
  }

  if (!isRecord(payload)) {
    return NextResponse.json(
      { ok: false, message: "Тело запроса должно быть JSON-объектом." },
      { status: 400 }
    );
  }

  const validation = validateLeadPayload(payload);

  if (validation.ok && validation.spam) {
    return NextResponse.json({ ok: true });
  }

  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, message: "Проверьте поля формы.", errors: validation.errors },
      { status: 400 }
    );
  }

  try {
    const delivery = await deliverLead(validation.lead);

    if (!delivery.ok) {
      return NextResponse.json(
        {
          ok: false,
          message:
            delivery.total === 0
              ? "Каналы доставки заявок не настроены."
              : "Не удалось доставить заявку.",
          delivery: getPublicDeliveryReport(delivery)
        },
        { status: delivery.total === 0 ? 503 : 502 }
      );
    }

    return NextResponse.json({ ok: true, delivery: getPublicDeliveryReport(delivery) });
  } catch (error) {
    console.error("Unexpected lead endpoint error:", error);

    return NextResponse.json(
      { ok: false, message: "Не удалось отправить заявку." },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json(
    { ok: false, message: "Use POST /api/leads to create a lead." },
    { status: 405 }
  );
}
