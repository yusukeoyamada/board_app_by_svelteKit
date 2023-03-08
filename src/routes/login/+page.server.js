import { db } from "$lib/prisma";
// 以下、ts利用例
// import { type Actions, fail, redirect} from "@sveltejs/kit";
import { fail, redirect} from "@sveltejs/kit";
import bcrypt from "bcrypt";

export const actions = {
  login: async ({request, cookies}) => {
    const data = await request.formData();
    const name = data.get("name");
    const password = data.get("password");
    if (!name || !password) {
      return fail(400, { message: "名前とパスワードを入力してください" });
    }

    const user = await db.user.findUnique({
      where: {name}
    });
    if (!user) {
      return fail(400, { message: "名前またはパスワードを間違えています" });
    }

    // パスワードの一致確認
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return fail(400, { message: "名前またはパスワードを間違えています"});
    }

    // 該当のユーザーのauthTokenを更新
    const authenticatedUser = await db.user.update({
      where: { name },
      data: {
        authToken: crypto.randomUUID()
      }
    });

    // クッキーを使ったセッションの管理
      // ここでは、キーに関して、「session_id」の代わりに「session」を
      // ここでは、キーに紐づく値に関して、「セッションID」の代わりに、「ユーザー識別情報」を設定している
        // setの第一引数: cookieの名前
        // setの第二引数: 値
        // setの第三引数: オプション
    cookies.set('session', authenticatedUser.authToken, {
      // デフォルトパス
      path: '/',
      // 有効期限を1ヶ月に(秒で指定)
        // 60秒(1分)*60(1時間)*24(1日)*30(1ヶ月)
      maxAge: 60*60*24*30,
    });

    throw redirect(303, '/');
  }
}

// 以下、ts利用例
// export const actions: Actions = {
//   login: async ({request, cookies}) => {
//     const data = await request.formData();
//     const name = data.get("name");
//     const password = data.get("password");

//     if (typeof name !== "string" || typeof password !== "string" || !name || !password) {
//       return fail(400, { message: "名前とパスワードを入力してください" })
//     }
//     const user = await db.user.findUnique({
//       where: {name}
//     })

//     if (!user) {
//       return fail(400, { message: "名前またはパスワードを間違えています" });
//     }

//     const correctPassword = await bcrypt.compare(password, user.password)

//     if (!correctPassword) {
//       return fail(400, { message: "名前またはパスワードを間違えています"})
//     }

//     const authenticatedUser = await db.user.update({
//       where: { name },
//       data: {
//         authToken: crypto.randomUUID()
//       }
//     })

//     cookies.set('session', authenticatedUser.authToken, {
//       path: '/',
//       maxAge: 60*60*24*30,
//     })

//     throw redirect(303, '/')
//   }
// }
