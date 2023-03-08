<!-- 1つ1つのスレッドのコンポーネント -->

<!-- 以下、ts利用例 -->
<!-- <script lang="ts">
  export let id : number;
  export let content: string;
</script> -->

<script>
  export let id;
  export let content;
</script>

<div class="thread">
  <div class="thread-content">
    <h2>{content}</h2>
    <a href="detail/{id}">スレッドの詳細を見る</a>
  </div>
</div>

<style>
  .thread {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 10px auto;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }

  .thread-content {
    width: 100%;
    margin-left: 10px;
  }

  .thread-content a {
    display: inline-block;
    font-size: 14px;
    color: blue;
    text-decoration: none;
  }
</style>
