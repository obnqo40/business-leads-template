import { businessConfig } from "@/config/business.config";
import type { MessengerId } from "@/config/business.config";
import type { Lead } from "./lead.types";

type RawLeadPayload = {
  name?: unknown;
  contact?: unknown;
  service?: unknown;
  preferredMessenger?: unknown;
  comment?: unknown;
  source?: unknown;
  consent?: unknown;
  website?: unknown;
};

const FIELD_LIMITS = {
  name: 80,
  contact: 160,
  service: 80,
  preferredMessenger: 30,
  comment: 500,
  source: 80,
  website: 120
} as const;

type ValidationResult =
  | { ok: true; lead: Lead; spam: false }
  | { ok: true; spam: true }
  | { ok: false; errors: Record<string, string> };

const allowedMessengers = new Set<MessengerId>(
  businessConfig.integrations.enabledContactMethods
);

function getHoneypotValue(value: unknown) {
  if (value == null) {
    return "";
  }

  if (typeof value !== "string") {
    return "filled";
  }

  return value.trim().slice(0, FIELD_LIMITS.website);
}

function readRequiredText(
  value: unknown,
  field: string,
  label: string,
  maxLength: number,
  errors: Record<string, string>
) {
  if (typeof value !== "string") {
    errors[field] = `Поле «${label}» должно быть строкой.`;
    return "";
  }

  const text = value.trim();

  if (!text) {
    errors[field] = `Укажите ${label.toLowerCase()}.`;
    return "";
  }

  if (text.length > maxLength) {
    errors[field] = `Поле «${label}» должно быть не длиннее ${maxLength} символов.`;
  }

  return text;
}

function readOptionalText(
  value: unknown,
  field: string,
  label: string,
  maxLength: number,
  errors: Record<string, string>
) {
  if (value == null || value === "") {
    return "";
  }

  if (typeof value !== "string") {
    errors[field] = `Поле «${label}» должно быть строкой.`;
    return "";
  }

  const text = value.trim();

  if (text.length > maxLength) {
    errors[field] = `Поле «${label}» должно быть не длиннее ${maxLength} символов.`;
  }

  return text;
}

export function validateLeadPayload(payload: RawLeadPayload): ValidationResult {
  const errors: Record<string, string> = {};
  const honeypot = getHoneypotValue(payload.website);

  if (honeypot) {
    return { ok: true, spam: true };
  }

  const name = readRequiredText(payload.name, "name", "имя", FIELD_LIMITS.name, errors);
  const contact = readRequiredText(
    payload.contact,
    "contact",
    "контакт",
    FIELD_LIMITS.contact,
    errors
  );
  const serviceId = readRequiredText(
    payload.service,
    "service",
    "услугу",
    FIELD_LIMITS.service,
    errors
  );
  const preferredMessenger = readRequiredText(
    payload.preferredMessenger,
    "preferredMessenger",
    "удобный способ связи",
    FIELD_LIMITS.preferredMessenger,
    errors
  ) as MessengerId;
  const comment = readOptionalText(
    payload.comment,
    "comment",
    "комментарий",
    FIELD_LIMITS.comment,
    errors
  );
  const source =
    readOptionalText(payload.source, "source", "источник", FIELD_LIMITS.source, errors) ||
    "site";
  const service = businessConfig.services.find((item) => item.id === serviceId);

  if (serviceId && !service) {
    errors.service = "Выберите услугу из списка.";
  }

  if (preferredMessenger && !allowedMessengers.has(preferredMessenger)) {
    errors.preferredMessenger = "Выберите удобный способ связи из списка.";
  }

  if (payload.consent !== true) {
    errors.consent = "Необходимо согласие на обработку персональных данных.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    spam: false,
    lead: {
      name,
      contact,
      service: service?.title ?? serviceId,
      serviceId,
      preferredMessenger,
      comment: comment || undefined,
      source,
      createdAt: new Date().toISOString()
    }
  };
}
