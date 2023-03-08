<!-- 以下、ts利用例 -->
<!-- <script lang="ts"></script> -->
<script>
  import { page } from '$app/stores';
</script>

<!-- 以下、$page.data.userになっていたが、
$page.dataで受け取れるのは、load関数から返されたデータのみ。 -->
{#if !$page.data.loginUser}
  <a href="/login">ログイン</a>
  <a href="/register">新規登録</a>
{:else}
  <!-- 以下で、logoutディレクトリのlogoutアクションを実行することに -->
  <form action="/logout?/logout" method="POST">
    <button>ログアウト</button>
  </form>
{/if}

<slot />
