import { db } from "$lib/prisma";
// 以下、ts利用例
// import type { Handle, HandleServerError } from "@sveltejs/kit";

// handle関数
  // SvelteKitのサーバーがリクエストを受けるたびに(アプリの実行中であろうと、プリレンダリングであろうと)、
  // 実行され、レスポンスを決定
    // リクエストを表す「event」オブジェクトと、
    // ルート(route)をレンダリングし、レスポンスを生成する「resolve」という関数を受け取ります。
      // 未実装の場合、デフォルトは ({ event, resolve }) => resolve(event)と
export const handle = async ({ event, resolve }) => {
  const session = event.cookies.get('session');

  if (!session) {
    // 以下の置き換え
      // const response = await resolve(event);
    return await resolve(event);
  }

  const user = await db.user.findUnique({
    where: { authToken: session },
    // idとnameだけ取り出す
    select: {
      id: true,
      name: true,
    }
  });
  if (user) {
    // event.localsにuser情報を格納
    // localsに格納した情報は、アプリ内で使うことが可能に
      // カスタムデータをリクエストに追加し、「+server.js」のハンドラーや、
      // サーバー(server)load関数に渡す為に、event.localsオブジェクトに埋め込み
    event.locals.user = {
      id: user.id,
      name: user.name
    };
  }

  // 以下の置き換え
    // const response = await resolve(event);
  return await resolve(event);
};

// handleError
// 想定できないエラー(Unexpected errors)発生時に実行
export const handleError = ({ event }) => {
  return {
    // message: event.url.pathname + "でエラーが発生！",
    message: event.url.pathname + "で500エラーが発生！",
  };
}

// 以下、ts利用例
// export const handle: Handle = async ({ event, resolve }) => {
//   const session = event.cookies.get('session');

//   if (!session) {
//     return await  resolve(event);
//   }

//   const user = await db.user.findUnique({
//     where: { authToken: session},
//     select: {id: true, name: true}
//   });

//   if (user) {
//     event.locals.user = {
//       id: user.id,
//       name: user.name
//     };
//   }

//   return await resolve(event);
// };

// export const handleError: HandleServerError = ({event}) => {
//   return {
//     message: event.url.pathname + "で500エラーが発生！",
//   };
// }
