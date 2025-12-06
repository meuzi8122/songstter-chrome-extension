import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  modules: ["@wxt-dev/module-svelte"],
  runner: {
    // bun run devでブラウザを立ち上げた時に開くサイトのURL
    startUrls: ["https://www.youtube.com/watch?v=l9-E-7kRJes"],
  },
  manifest: {
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
  },
});
