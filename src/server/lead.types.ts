import type { DeliveryChannelId, MessengerId } from "@/config/business.config";

export type PreferredMessenger = MessengerId;

export type Lead = {
  name: string;
  contact: string;
  service: string;
  serviceId: string;
  preferredMessenger: PreferredMessenger;
  comment?: string;
  source: string;
  createdAt: string;
};

export type DeliveryAdapter = {
  name: DeliveryChannelId;
  enabled: boolean;
  send: (
    lead: Lead,
    context: { signal: AbortSignal; timeoutMs: number }
  ) => Promise<void>;
};

export type DeliveryReport = {
  ok: boolean;
  total: number;
  succeeded: DeliveryChannelId[];
  failed: Array<{ name: DeliveryChannelId; error: string }>;
};
