import { businessConfig } from "@/config/business.config";
import { getOptionalEnv, isHttpUrl } from "../env";
import type { DeliveryAdapter, Lead } from "../lead.types";

export function createGoogleSheetsAdapter(): DeliveryAdapter {
  const webhookUrl = getOptionalEnv("GOOGLE_SHEETS_WEBHOOK_URL");
  const enabled =
    businessConfig.integrations.enabledDeliveryChannels.includes("googleSheets") &&
    Boolean(webhookUrl && isHttpUrl(webhookUrl));

  return {
    name: "googleSheets",
    enabled,
    async send(lead: Lead, { signal }) {
      if (!webhookUrl || !isHttpUrl(webhookUrl)) {
        return;
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        signal
      });

      if (!response.ok) {
        throw new Error(`Google Sheets webhook returned ${response.status}`);
      }
    }
  };
}
