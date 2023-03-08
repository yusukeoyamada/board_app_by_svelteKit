<!-- 以下、ts利用例 -->
<!-- <script lang="ts"></script> -->
<script>
  // 以下、ts利用例
  // import type { ActionData } from "./$types"

  // fail関数を利用して戻したデータは、propsのformとして受け取ることが
  export let form;

  // 以下、ts利用例
  // export let form : ActionData;
</script>

<h1>スレッド投稿</h1>
{#if form?.message}
  {form.message}
{/if}

<form method="POST" action="?/post">
  <label>内容：
    <input name="content" type="text" />
  </label>
  <button>投稿する</button>
</form>
