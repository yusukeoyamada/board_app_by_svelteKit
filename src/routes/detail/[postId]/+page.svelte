<!-- 以下、ts利用例 -->
<!-- <script lang="ts"></script> -->
<script>
  // 以下、ts利用例
  // import type { ActionData, PageData } from "./$types";

  // 以下、ts利用例
  // type comment = {
  //   user: {
  //     name: string
  //   }
  //   content: string
  //   created_at: Date
  // };

  // 以下、ts利用例
  // export let data: PageData;

  // 以下、ts利用例
  // export let form: ActionData;

  // load関数を利用して戻したデータは、propsのdataとして受け取ることが
  export let data;

  // fail関数を利用して戻したデータは、propsのformとして受け取ることが
  export let form;

  // 以下、ts利用例
  // const threadAuthor : string = data.user.name;
  // const threadContent : string = data.threadDetail.content;
  // const threadCreatedAt: Date = data.threadDetail.created_at;
  // const comments : comment[] = data.threadDetail.Comment;

  const threadAuthor = data.threadDetail.user.name;
  const threadContent = data.threadDetail.content;
  const threadCreatedAt = data.threadDetail.created_at;
  const comments = data.threadDetail.Comment;
</script>

<div>
  <a href="/"> ＜ 一覧に戻る</a>
</div>

<h1>スレッド詳細</h1>
<h2>{threadContent}</h2>
<p>作成者：{threadAuthor} 作成日時：{threadCreatedAt}</p>
<h2>コメント</h2>
{#if comments.length}
  {#each comments as comment}
    <p>名前：{comment.user.name}</p>
    <p>日時：{comment.created_at}</p>
    <p>コメント：{comment.content}</p>
    <br />
  {/each}
{:else}
  <p>コメントはありません</p>
{/if}

{#if form?.message}
  <p class="error">{form.message}</p>
{/if}
<form method="POST" action="?/comment">
  <input name="comment" type="text" />
  <button>コメントする</button>
</form>

<style>
  .error {
    color: red;
  }
</style>
