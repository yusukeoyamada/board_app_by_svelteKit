<!-- 以下、ts利用例 -->
<!-- <script lang="ts">
  import {goto} from "$app/navigation";
  import type { PageData } from "./$types";
  import Thread from "$lib/Thread.svelte";
  export let data: PageData;
</script> -->

<script>
  import { goto } from "$app/navigation";
  import Thread from "$lib/Thread.svelte"; // Threadコンポーネントは、他と同じようにインポートするだけで使えるように

  export let data;
</script>

<main>
  <h1>スレッド一覧</h1>
  <!-- イベント発火時にページ遷移が行われるようにするには、goto関数を使う?? -->
    <!-- goto関数で投稿画面へナビゲーションを -->
  <button type="button" on:click={() => goto("/post")}>投稿する</button>

  {#each data.threads as thread }
    <Thread id={thread.id} content={thread.content} />
  {/each}
</main>
