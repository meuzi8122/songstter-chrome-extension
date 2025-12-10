import { findTablatures } from "@/lib/clients/songstter/find-tablatures";
import { onMessage } from "@/lib/utils/messaging";
import type { Instrument } from "@/lib/clients/songstter/tablature";

export default defineBackground(() => {
  onMessage(
    "findTablatures",
    async (message: {
      data: {
        title: string;
        artist: string;
        favoriteInstruments: Instrument[];
      };
    }) => {
      return await findTablatures(
        message.data.title,
        message.data.artist,
        message.data.favoriteInstruments
      );
    }
  );
});
