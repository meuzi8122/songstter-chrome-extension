<script lang="ts">
  import type { Tablature } from "@/lib/songstter/tablature";
  import "@/lib/styles/globals.css";

  type Props = {
    url: string;
    title: string;
    tablatures: Tablature[];
  };

  const { url, title, tablatures }: Props = $props();

  // svelte-ignore state_referenced_locally
  const tablatureExits = tablatures.length > 0;

  const handleTablatureButtonClick = () => {
    if (tablatureExits) {
      window.open(`https://www.songsterr.com/?pattern=${title}`, "_blank");
    } else {
      navigator.clipboard.writeText(url);
      alert(
        "動画URLをコピーしました。songsterrのTAB譜作成ページでペーストしてください。"
      );
      window.open("https://www.songsterr.com/new", "_blank");
    }
  };
</script>

<div class="songstter-chrome-extension fixed top-0 left-0 w-full">
  <div role="alert" class="alert alert-vertical">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="stroke-info h-6 w-6 shrink-0"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
    <span
      >{tablatureExits
        ? `「${title}」のTAB譜が${tablatures.length}件見つかりました。`
        : `「${title}」のTAB譜が存在しません`}</span
    >
    <div>
      <button
        class="btn btn-sm btn-primary"
        onclick={handleTablatureButtonClick}
        >{tablatureExits ? "TAB譜を閲覧" : "TAB譜を作成"}</button
      >
    </div>
  </div>
</div>
