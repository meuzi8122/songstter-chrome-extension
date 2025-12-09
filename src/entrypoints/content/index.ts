import { mount, unmount } from "svelte";
import App from "./App.svelte";
import { sendMessage } from "@/lib/utils/messaging";
import { ContentScriptContext } from "#imports";
import { getFavoriteInstruments } from "@/lib/utils/localstorage";

const YOUTUBE_WATCH_URL = "https://www.youtube.com/watch?v=";

const METADATA_SELECTOR = "#above-the-fold.style-scope.ytd-watch-metadata";
const SONG_TITLE_SELECTOR = "h1.yt-video-attribute-view-model__title";
const ARTIST_NAME_SELECTOR = "h4.yt-video-attribute-view-model__subtitle";

export default defineContentScript({
  // SPAでは最初に開いたページだけチェックされる
  matches: [`${YOUTUBE_WATCH_URL}*`],
  cssInjectionMode: "ui",
  async main(ctx) {
    let ui: Awaited<ReturnType<typeof createShadowRootUi>> | null =
      await handleLocationChange(window.location.href, ctx);

    // SPAはURLが変わってもContentScriptが再実行されないため、URLの変更を監視し都度onMountを実行する
    ctx.addEventListener(window, "wxt:locationchange", async ({ newUrl }) => {
      // 古いUIが残ったままになるのでアンマウント
      ui?.remove();
      if (newUrl.href.startsWith(YOUTUBE_WATCH_URL)) {
        ui = await handleLocationChange(newUrl.href, ctx);
      }
    });
  },
});

async function handleLocationChange(url: string, ctx: ContentScriptContext) {
  // ページ表示直後はh1のテキストが空なので、1秒待機
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 動画情報セクションを取得
  const root = document.querySelector(METADATA_SELECTOR);
  if (!root) {
    return null;
  }

  // 動画詳細に楽曲情報が記載されていなければ音楽動画でないとみなし中断
  // 日本人アーティストでもアルファベット表記っぽいので、songstterの検索でも使えそう
  const title = document.querySelector(SONG_TITLE_SELECTOR)?.textContent;
  const artist = document.querySelector(ARTIST_NAME_SELECTOR)?.textContent;
  if (!title || !artist) {
    return null;
  }

  // backgroundの処理を実行
  // @ts-ignore
  const tablatures = await sendMessage("findTablatures", {
    title,
    artist: artist,
    favoriteInstruments: getFavoriteInstruments(),
  });

  const hasTablatures = tablatures.length > 0;

  const ui = await createShadowRootUi(ctx, {
    // 識別子はケバブケースにしないとエラー
    name: "songstter-chrome-extension",
    position: "inline",
    anchor: root,
    onMount: (container) => {
      return mount(App, {
        target: container,
        props: {
          hasTablatures,
          handleButtonClick: () => {
            if (hasTablatures) {
              window.open(
                `https://www.songsterr.com/?pattern=${title}`,
                "_blank"
              );
            } else {
              navigator.clipboard.writeText(url);
              alert("動画URLをクリップボードにコピーしました");
              window.open("https://www.songsterr.com/new", "_blank");
            }
          },
        },
      });
    },
    onRemove: (app) => {
      if (app) unmount(app);
    },
  });

  ui.mount();
  return ui;
}
