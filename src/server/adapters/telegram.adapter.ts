import { businessConfig } from "@/config/business.config";
import { getOptionalEnv } from "../env";
import { formatLeadMessage } from "../formatLeadMessage";
import type { DeliveryAdapter, Lead } from "../lead.types";

export function createTelegramAdapter(): DeliveryAdapter {
  const token = getOptionalEnv("TELEGRAM_BOT_TOKEN");
  const chatId = getOptionalEnv("TELEGRAM_CHAT_ID");
  const enabled =
    businessConfig.integrations.enabledDeliveryChannels.includes("telegram") &&
    Boolean(token && chatId);

  return {
    name: "telegram",
    enabled,
    async send(lead: Lead, { signal }) {
      if (!token || !chatId) {
        return;
      }

      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: formatLeadMessage(lead),
          disable_web_page_preview: true
        }),
        signal
      });

      if (!response.ok) {
        throw new Error(`Telegram returned ${response.status}`);
      }
    }
  };
}
