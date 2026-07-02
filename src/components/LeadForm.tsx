"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { businessConfig } from "@/config/business.config";
import type { MessengerId } from "@/config/business.config";

type FormState = {
  name: string;
  contact: string;
  service: string;
  preferredMessenger: MessengerId | "";
  comment: string;
  consent: boolean;
  website: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const FIELD_LIMITS = {
  name: 80,
  contact: 160,
  comment: 500
} as const;

const errorFieldKeys = new Set<keyof FormState>([
  "name",
  "contact",
  "service",
  "preferredMessenger",
  "comment",
  "consent",
  "website"
]);

const initialState: FormState = {
  name: "",
  contact: "",
  service: businessConfig.services[0]?.id ?? "",
  preferredMessenger: businessConfig.integrations.enabledContactMethods[0] ?? "",
  comment: "",
  consent: false,
  website: ""
};

function validateForm(values: FormState) {
  const errors: FieldErrors = {};
  const selectedServiceExists = businessConfig.services.some(
    (service) => service.id === values.service
  );
  const selectedContactMethodExists =
    values.preferredMessenger &&
    businessConfig.integrations.enabledContactMethods.includes(values.preferredMessenger);

  if (!values.name.trim()) {
    errors.name = "Укажите имя.";
  } else if (values.name.trim().length > FIELD_LIMITS.name) {
    errors.name = `Имя должно быть не длиннее ${FIELD_LIMITS.name} символов.`;
  }

  if (!values.contact.trim()) {
    errors.contact = "Укажите телефон, ник или email для связи.";
  } else if (values.contact.trim().length > FIELD_LIMITS.contact) {
    errors.contact = `Контакт должен быть не длиннее ${FIELD_LIMITS.contact} символов.`;
  }

  if (!values.service) {
    errors.service = "Выберите услугу.";
  } else if (!selectedServiceExists) {
    errors.service = "Выберите услугу из списка.";
  }

  if (!values.preferredMessenger) {
    errors.preferredMessenger = "Выберите удобный способ связи.";
  } else if (!selectedContactMethodExists) {
    errors.preferredMessenger = "Выберите удобный способ связи из списка.";
  }

  if (values.comment.trim().length > FIELD_LIMITS.comment) {
    errors.comment = `Комментарий должен быть не длиннее ${FIELD_LIMITS.comment} символов.`;
  }

  if (!values.consent) {
    errors.consent = "Нужно согласие на обработку персональных данных.";
  }

  return errors;
}

function getApiFieldErrors(value: unknown): FieldErrors {
  if (!value || typeof value !== "object" || !("errors" in value)) {
    return {};
  }

  const errors = (value as { errors?: unknown }).errors;

  if (!errors || typeof errors !== "object") {
    return {};
  }

  return Object.entries(errors).reduce<FieldErrors>((result, [key, message]) => {
    if (errorFieldKeys.has(key as keyof FormState) && typeof message === "string") {
      result[key as keyof FormState] = message;
    }

    return result;
  }, {});
}

export function LeadForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const section = businessConfig.sections.form;
  const formCopy = businessConfig.form;

  const contactMethods = useMemo(
    () =>
      businessConfig.integrations.enabledContactMethods.map((id) => ({
        id,
        label: businessConfig.integrations.contactMethodLabels[id]
      })),
    []
  );

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");

    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          source: "landing"
        })
      });
      const result: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const apiFieldErrors = getApiFieldErrors(result);

        if (Object.keys(apiFieldErrors).length > 0) {
          setErrors(apiFieldErrors);
        }

        throw new Error("Lead request failed");
      }

      setValues(initialState);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section-y" id="lead-form">
      <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          {section.eyebrow ? <p className="section-kicker">{section.eyebrow}</p> : null}
          <h2 className="section-title mt-2">{section.title}</h2>
          <p className="section-copy">{section.description}</p>
          <div className="mt-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-soft">
            <p className="text-sm font-semibold">{formCopy.noteTitle}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              {formCopy.noteText}
            </p>
          </div>
        </div>

        <form className="content-card" noValidate onSubmit={onSubmit}>
          <div className="mb-6 border-b border-[var(--color-border)] pb-5">
            <p className="text-lg font-semibold">{formCopy.title}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              {formCopy.subtitle}
            </p>
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Сайт</label>
            <input
              autoComplete="off"
              id="website"
              name="website"
              tabIndex={-1}
              value={values.website}
              onChange={(event) => setField("website", event.target.value)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="name">
                Имя
              </label>
              <input
                autoComplete="name"
                className="field-control"
                id="name"
                maxLength={FIELD_LIMITS.name}
                name="name"
                placeholder={formCopy.placeholders.name}
                value={values.name}
                onChange={(event) => setField("name", event.target.value)}
              />
              {errors.name ? <p className="field-error">{errors.name}</p> : null}
            </div>

            <div>
              <label className="field-label" htmlFor="contact">
                Контакт
              </label>
              <input
                autoComplete="tel"
                className="field-control"
                id="contact"
                maxLength={FIELD_LIMITS.contact}
                name="contact"
                placeholder={formCopy.placeholders.contact}
                value={values.contact}
                onChange={(event) => setField("contact", event.target.value)}
              />
              {errors.contact ? <p className="field-error">{errors.contact}</p> : null}
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="service">
                Услуга
              </label>
              <select
                className="field-control"
                id="service"
                name="service"
                value={values.service}
                onChange={(event) => setField("service", event.target.value)}
              >
                {businessConfig.services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
              </select>
              {errors.service ? <p className="field-error">{errors.service}</p> : null}
            </div>

            <div>
              <label className="field-label" htmlFor="preferredMessenger">
                Удобный способ связи
              </label>
              <select
                className="field-control"
                id="preferredMessenger"
                name="preferredMessenger"
                value={values.preferredMessenger}
                onChange={(event) =>
                  setField("preferredMessenger", event.target.value as MessengerId)
                }
              >
                {contactMethods.map((method) => (
                  <option key={method.id} value={method.id}>
                    {method.label}
                  </option>
                ))}
              </select>
              {errors.preferredMessenger ? (
                <p className="field-error">{errors.preferredMessenger}</p>
              ) : null}
            </div>
          </div>

          <div className="mt-5">
            <label className="field-label" htmlFor="comment">
              Комментарий
            </label>
            <textarea
              className="field-control min-h-28 resize-y"
              id="comment"
              maxLength={FIELD_LIMITS.comment}
              name="comment"
              placeholder={formCopy.placeholders.comment}
              value={values.comment}
              onChange={(event) => setField("comment", event.target.value)}
            />
            {errors.comment ? <p className="field-error">{errors.comment}</p> : null}
          </div>

          <label className="mt-5 flex gap-3 text-sm leading-6 text-[var(--color-muted)]">
            <input
              checked={values.consent}
              className="mt-1 h-4 w-4 rounded border-[var(--color-border)] text-[var(--color-primary)]"
              name="consent"
              type="checkbox"
              onChange={(event) => setField("consent", event.target.checked)}
            />
            <span>
              {formCopy.privacyText}{" "}
              <Link className="font-semibold text-[var(--color-primary)]" href="/privacy">
                политику конфиденциальности
              </Link>
              .
              {errors.consent ? <span className="field-error block">{errors.consent}</span> : null}
            </span>
          </label>

          <button
            className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70"
            disabled={status === "loading"}
            type="submit"
          >
            {status === "loading" ? formCopy.loading : formCopy.submit}
          </button>

          {status === "success" ? (
            <p className="mt-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              {formCopy.success}
            </p>
          ) : null}

          {status === "error" ? (
            <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {formCopy.error}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
