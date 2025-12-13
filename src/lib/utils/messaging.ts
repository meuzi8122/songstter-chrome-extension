import { defineExtensionMessaging } from "@webext-core/messaging";
import { Instrument, type Tablature } from "@/lib/clients/songstter/tablature";

interface ProtocolMap {
  findTablatures(
    title: string,
    artist: string,
    favoriteInstruments: Instrument[]
  ): Tablature[];
  createTablature(videoId: string): { success: boolean; message?: string };
}

export const { sendMessage, onMessage } =
  defineExtensionMessaging<ProtocolMap>();
