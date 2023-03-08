import { redirect } from "@sveltejs/kit";
// 以下、ts利用例
// import type { LayoutServerLoad } from "./$types";

// 引数: url
  // リクエストされたURL
export const load = async ({ url, cookies, locals }) => {
  const session = await cookies.get('session');
  if(!session && (url.pathname !== '/login' && url.pathname!== '/register')) {
    throw redirect(303, '/login');
  }

  // 以下、教材にない追加実装
    // 「board_app/src/hooks.server.js」にて、event.localsに格納された情報を利用
  return {
    loginUser: locals.user,
  };
}

// 以下、ts利用例
// export const load: LayoutServerLoad = async ({ url, cookies  }) => {
//   const session = await cookies.get('session')
//   if(!session && (url.pathname !== '/login' && url.pathname!== '/register')) {
//     throw redirect(303, '/login')
//   }
// }
