<!-- 以下、ts利用例 -->
<!-- <script lang="ts"></script> -->
<script>
  import { page } from '$app/stores';
</script>

<h1>「detail_id」: エラーページ</h1>
<h3>{$page.error?.message}</h3>
