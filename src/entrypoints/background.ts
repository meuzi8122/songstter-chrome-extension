import { findTablatures } from "@/lib/clients/songstter/find-tablatures";
import { onMessage } from "@/lib/utils/messaging";
import type { Instrument } from "@/lib/clients/songstter/tablature";
import { createTablature } from "@/lib/clients/songstter/create-tablature";
import { UnauthorizedSongstterError } from "@/lib/clients/songstter/error";

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

  onMessage("createTablature", async (message: { data: string }) => {
    // @ts-ignore
    const cookies = chrome.cookies.getAll({
      domain: ".songsterr.com",
    });
    const cookie = cookies.find((cookie: any) => cookie.name === "exp")?.value;

    // コンテンツスクリプトで例外をキャッチすることはできない
    if (!cookie)
      return {
        success: false,
        message: "songstterアカウントでログインしてください。",
      };

    try {
      await createTablature(message.data, cookie);
    } catch (error) {
      if (error instanceof UnauthorizedSongstterError) {
        return {
          success: false,
          message:
            "songstterの認証に失敗しました。songstterアカウントでログインしているか確認してください。",
        };
      }
      return {
        success: false,
        message:
          "songstterとの接続に失敗しました。しばらくしてからもう一度お試しください。",
      };
    }

    return { success: true, message: "TAB譜の作成を開始しました。" };
  });
});
