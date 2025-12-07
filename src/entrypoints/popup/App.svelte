<script lang="ts">
  import {
    getFavoriteInstruments,
    setFavoriteInstruments,
  } from "@/lib/utils/local-storage";

  // onMountで初期化するとeffectが呼ばれてしまうのでダメ
  let favoriteInstruments = $state(getFavoriteInstruments());

  $effect(() => {
    setFavoriteInstruments(favoriteInstruments);
  });
</script>

<main class="p-1">
  <h1 class="text-base font-bold mb-1">検索設定</h1>
  <div>
    <fieldset
      class="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4"
    >
      <legend class="fieldset-legend">以下の楽器のTAB譜を検索</legend>
      <div class="flex flex-col space-y-2">
        {#each [{ name: "Guitar", label: "ギター" }, { name: "Bass", label: "ベース（4弦・5弦）" }] as instrument}
          <label class="label flex justify-between">
            {instrument.label}
            <input
              type="checkbox"
              checked={true}
              class="toggle toggle-sm checked:toggle-primary"
              value={instrument.name}
              bind:group={favoriteInstruments}
            />
          </label>
        {/each}
      </div>
    </fieldset>
  </div>
</main>
