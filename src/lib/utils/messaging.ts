import { defineExtensionMessaging } from "@webext-core/messaging";

interface ProtocolMap {
  findTablatures(title: string): Record<string, any>[];
}

export const { sendMessage, onMessage } =
  defineExtensionMessaging<ProtocolMap>();
