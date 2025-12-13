import * as path from "path";
import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  modules: ["@wxt-dev/module-svelte"],
  runner: {
    // bun run devでブラウザを立ち上げた時に開くサイトのURL
    startUrls: ["https://www.youtube.com/watch?v=Fve_lHIPa-I"],
    // cookieを永続化するため開発環境用の永続的なchromeプロファイルを作成
    chromiumArgs: [`--user-data-dir=${path.resolve(".dev-profile")}`],
  },
  manifest: {
    name: "Songstter Chrome Extension",
    background: {
      service_worker: "background.ts",
    },
    content_scripts: [
      {
        matches: ["https://www.youtube.com/watch?v=*"],
        js: ["entrypoints/content/index.ts"],
      },
    ],
    // これがないとbackgroundもcorsに引っかかる
    host_permissions: ["https://www.songsterr.com/api/*"],
    permissions: ["storage"],
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
