<!-- 以下、ts利用例 -->
<!-- <script lang="ts"></script> -->
<script>
  // 以下、ts利用例
  // import type { ActionData } from "./$types";

  // fail関数を利用して戻したデータは、propsのformとして受け取ることが
  export let form;

  // 以下、ts利用例
  // export let form: ActionData;
</script>

<h1>ユーザー登録</h1>
<!-- formにmessageが含まれているかチェックを行い、含まれている場合はmessageをブラウザ上に表示 -->
{#if form?.message}
  <p class="error">{form?.message}</p>
{/if}

<form method="post" action="?/register">
  <!-- 以下のようなラベルとフォームをリンクさせる方法とは、別の方法をここでは取っている -->
    <!-- <label for="name">Name:</label> -->
    <!-- <input name="name" id="name" /> -->
  <label>名前：
    <input name="name" type="text" />
  </label>
  <label>パスワード：
    <input name="password" type="password" />
  </label>
  <button>登録する</button>
</form>

<style>
  .error {
    color: red;
  }
</style>
