import { defineExtensionMessaging } from "@webext-core/messaging";
import { Instrument, Tablature } from "../songstter/tablature";

interface ProtocolMap {
  findTablatures(title: string, favoriteInstruments: Instrument[]): Tablature[];
}

export const { sendMessage, onMessage } =
  defineExtensionMessaging<ProtocolMap>();
