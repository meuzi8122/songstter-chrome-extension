import { findTablatures } from "@/lib/songstter/find-tablatures";
import { onMessage } from "@/lib/utils/messaging";

export default defineBackground(() => {
  onMessage("findTablatures", async (message: { data: string }) => {
    return await findTablatures(message.data);
  });
});
