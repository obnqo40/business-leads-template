import { businessConfig } from "@/config/business.config";
import { getOptionalEnv, isHttpUrl } from "../env";
import { formatLeadMessage } from "../formatLeadMessage";
import type { DeliveryAdapter } from "../lead.types";

export function createMaxAdapter(): DeliveryAdapter {
  const token = getOptionalEnv("MAX_BOT_TOKEN");
  const chatId = getOptionalEnv("MAX_CHAT_ID");
  const apiUrl = getOptionalEnv("MAX_API_URL");
  const enabled =
    businessConfig.integrations.enabledDeliveryChannels.includes("max") &&
    Boolean(token && chatId && apiUrl && isHttpUrl(apiUrl));

  return {
    name: "max",
    enabled,
    async send(lead, { signal }) {
      if (!token || !chatId || !apiUrl || !isHttpUrl(apiUrl)) {
        return;
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: formatLeadMessage(lead)
        }),
        signal
      });

      if (!response.ok) {
        const responseText = await response.text().catch(() => "");
        throw new Error(
          `MAX delivery failed with ${response.status}: ${responseText.slice(0, 200)}`
        );
      }
    }
  };
}
