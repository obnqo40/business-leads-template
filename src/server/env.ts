const SECRET_ENV_NAMES = [
  "TELEGRAM_BOT_TOKEN",
  "TELEGRAM_CHAT_ID",
  "MAX_BOT_TOKEN",
  "MAX_CHAT_ID",
  "MAX_API_URL",
  "RESEND_API_KEY",
  "EMAIL_TO",
  "EMAIL_FROM",
  "GOOGLE_SHEETS_WEBHOOK_URL"
] as const;

export function getOptionalEnv(name: string) {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

export function getBooleanEnv(name: string) {
  return getOptionalEnv(name)?.toLowerCase() === "true";
}

export function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function redactSecrets(message: string) {
  return SECRET_ENV_NAMES.reduce((current, envName) => {
    const secret = getOptionalEnv(envName);

    if (!secret || secret.length < 6) {
      return current;
    }

    return current.split(secret).join("[redacted]");
  }, message);
}
