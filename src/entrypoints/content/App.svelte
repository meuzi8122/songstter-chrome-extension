<script lang="ts">
  import "@/lib/styles/globals.css";

  const { hasTablatures, handleButtonClick } = $props<{
    hasTablatures: boolean;
    handleButtonClick: () => void;
  }>();
</script>

<!-- シャドウDOMのルート要素にマージンを指定しても効かない（親の実DOMに影響を与えない） -->
<div class="songstter-chrome-extension">
  <div class="flex items-center justify-between mt-6 mb-6">
    <span
      >{hasTablatures
        ? `この楽曲のTAB譜が投稿されています`
        : "この楽曲のTAB譜は投稿されていません"}</span
    >
    <button class="btn btn-primary btn-xl" onclick={handleButtonClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
        />
      </svg>

      {hasTablatures ? "TAB譜を閲覧" : "TAB譜を作成"}</button
    >
  </div>
</div>
