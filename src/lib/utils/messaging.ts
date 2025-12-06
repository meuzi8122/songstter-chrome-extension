import { defineExtensionMessaging } from "@webext-core/messaging";
import { Tablature } from "../songstter/tablature";

interface ProtocolMap {
  findTablatures(title: string): Tablature[];
}

export const { sendMessage, onMessage } =
  defineExtensionMessaging<ProtocolMap>();
