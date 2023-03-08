<!-- 以下、ts利用例 -->
<!-- <script lang="ts"></script> -->
<script>
  // 以下、ts利用例
  // import type {ActionData} from './$types';

  // fail関数を利用して戻したデータは、propsのformとして受け取ることが
  export let form;

  // 以下、ts利用例
  // export let form: ActionData;
</script>

<h1>ログイン画面</h1>
{#if form?.message}
  <p class="error">{form.message}</p>
{/if}

<form method="POST" action="?/login">
  <label>名前:
    <input name="name" type="text" />
  </label>
  <label>
    パスワード：
    <input name="password" type="password" />
  </label>
  <button>ログイン</button>
</form>

<style>
  .error {
      color: red;
  }
</style>
