import { mount, unmount } from "svelte";
import TablatureList from "./TablatureList.svelte";
import { sendMessage } from "@/lib/utils/messaging";
import { ContentScriptContext } from "#imports";

export default defineContentScript({
  // SPAでは最初に開いたページだけチェックされる
  matches: ["https://www.youtube.com/watch?v=*"],
  cssInjectionMode: "ui",
  async main(ctx) {
    let ui: Awaited<ReturnType<typeof createShadowRootUi>> | null =
      await createUi(location.href, ctx);

    // 初回ページ読み込み時のonMountを実行
    ui!.mount();

    // SPAはURLが変わってもContentScriptが再実行されないため、URLの変更を監視し都度onMountを実行する
    ctx.addEventListener(window, "wxt:locationchange", async ({ newUrl }) => {
      // 古いUIが残ったままになるのでアンマウント
      ui?.remove();
      if (newUrl.href.startsWith("https://www.youtube.com/watch?v=")) {
        ui = await createUi(newUrl.href, ctx);
        ui?.mount();
      }
    });
  },
});

async function createUi(url: string, ctx: ContentScriptContext) {
  // ページ表示直後はh1のテキストが空なので、1秒待機
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const title = document.getElementsByClassName(
    "yt-video-attribute-view-model__title"
  )[0]?.textContent;

  // 動画詳細に音楽情報が記載されていなければ音楽動画でないとみなし中断
  if (!title) {
    return null;
  }

  // backgroudの処理を実行
  const tablatures = await sendMessage("findTablatures", title);

  return await createShadowRootUi(ctx, {
    // 識別子はケバブケースにしないとエラー
    name: "tablature-list",
    position: "overlay",
    anchor: "body",
    onMount: (container) => {
      return mount(TablatureList, {
        target: container,
        props: { url, tablatures, title: title || "" },
      });
    },
    onRemove: (app) => {
      if (app) unmount(app);
    },
  });
}
