import { redirect } from "@sveltejs/kit";
// 以下、ts利用例
// import type { PageServerLoad, Actions } from "./$types";

export const load = async () => {
  // 「/logout」に遷移した場合でも、一覧へ戻るように
  throw redirect(303, '/');
}

export const actions = {
  logout: async ({ cookies }) => {
    // cookie情報を消す
    cookies.delete('session');

    // ログイン画面にリダイレクト
    throw redirect(303, '/login');
  }
}

// 以下、ts利用例
// export const load: PageServerLoad = async () => {
//   throw redirect(303, '/');
// }

// export const actions: Actions = {
//   logout: async ({ cookies }) => {
//     cookies.delete('session');

//     throw redirect(303, '/login');
//   }
// }
