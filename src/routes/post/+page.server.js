import { db } from "$lib/prisma";
// 以下、ts利用例
// import { fail, redirect, type Actions } from "@sveltejs/kit";
import { fail, redirect } from "@sveltejs/kit";

// 引数: locals
  // handle_hook内でリクエストに追加されるカスタムのdataが含まれる。
export const actions = {
  post: async ({ request, locals }) => {
    const data = await request.formData();
    const content = data.get("content");

    if (!content) {
      return fail(400, { message: "タイトルと内容は必須入力です。"});
    }

    // 「board_app/src/hooks.server.js」にて、event.localsに格納された情報を利用
    if (!locals.user) return fail(400, { message: "登録されていないユーザーです。" });

    await db.post.create({
      data: {
        userId: locals.user.id,
        content,
      }
    });

    throw redirect(303, '/');
  }
}

// 以下、ts利用例
// export const actions: Actions = {
//   post: async ({request, locals}) => {
//     const data = await request.formData();
//     const content = data.get("content");

//     if (typeof content !== "string" || !content) {
//       return fail(400, { message: "タイトルと内容は必須入力です。"});
//     }

//     if (!locals.user) return fail(400, {message: "登録されていないユーザーです。"});

//     await db.post.create({
//       data: {
//         userId: locals.user.id,
//         content,
//       }
//     });

//     throw redirect(303, '/');
//   }
// }
