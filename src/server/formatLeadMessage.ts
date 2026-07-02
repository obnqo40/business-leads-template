import { businessConfig } from "@/config/business.config";
import type { Lead } from "./lead.types";

function formatDate(value: string) {
  return new Intl.DateTimeFormat(businessConfig.locale.language, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: businessConfig.locale.timeZone
  }).format(new Date(value));
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function formatLeadMessage(lead: Lead) {
  return [
    "Новая заявка с сайта",
    "",
    `Имя: ${lead.name}`,
    `Услуга: ${lead.service}`,
    `Контакт: ${lead.contact}`,
    `Удобно ответить: ${businessConfig.integrations.contactMethodLabels[lead.preferredMessenger]}`,
    `Комментарий: ${lead.comment || "не указан"}`,
    `Источник: ${lead.source}`,
    `Дата: ${formatDate(lead.createdAt)}`
  ].join("\n");
}

export function formatLeadHtml(lead: Lead) {
  const rows = [
    ["Имя", lead.name],
    ["Услуга", lead.service],
    ["Контакт", lead.contact],
    [
      "Удобно ответить",
      businessConfig.integrations.contactMethodLabels[lead.preferredMessenger]
    ],
    ["Комментарий", lead.comment || "не указан"],
    ["Источник", lead.source],
    ["Дата", formatDate(lead.createdAt)]
  ];

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111827;">
      <h2 style="margin: 0 0 16px;">Новая заявка с сайта</h2>
      <table style="border-collapse: collapse; width: 100%;">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="border: 1px solid #dfe7df; padding: 10px; font-weight: 700;">${label}</td>
                <td style="border: 1px solid #dfe7df; padding: 10px;">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
      </table>
    </div>
  `;
}
