import { businessConfig } from "@/config/business.config";
import { getBooleanEnv, getOptionalEnv } from "../env";
import { formatLeadHtml, formatLeadMessage } from "../formatLeadMessage";
import type { DeliveryAdapter, Lead } from "../lead.types";

export function createEmailAdapter(): DeliveryAdapter {
  const enabledByConfig = businessConfig.integrations.enabledDeliveryChannels.includes("email");
  const enabledByEnv = getBooleanEnv("EMAIL_ENABLED");
  const apiKey = getOptionalEnv("RESEND_API_KEY");
  const to = getOptionalEnv("EMAIL_TO");
  const from = getOptionalEnv("EMAIL_FROM");
  const enabled = enabledByConfig && enabledByEnv && Boolean(apiKey && to && from);

  return {
    name: "email",
    enabled,
    async send(lead: Lead, { signal }) {
      if (!apiKey || !to || !from) {
        return;
      }

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from,
          to,
          subject: `Новая заявка: ${lead.service}`,
          text: formatLeadMessage(lead),
          html: formatLeadHtml(lead)
        }),
        signal
      });

      if (!response.ok) {
        throw new Error(`Email provider returned ${response.status}`);
      }
    }
  };
}
