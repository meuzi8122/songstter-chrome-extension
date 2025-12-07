import { findTablatures } from "@/lib/songstter/find-tablatures";
import { Instrument } from "@/lib/songstter/tablature";
import { onMessage } from "@/lib/utils/messaging";

export default defineBackground(() => {
  onMessage(
    "findTablatures",
    async (message: {
      data: { title: string; favoriteInstruments: Instrument[] };
    }) => {
      return await findTablatures(
        message.data.title,
        message.data.favoriteInstruments
      );
    }
  );
});
