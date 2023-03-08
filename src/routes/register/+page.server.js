import { fail, redirect } from "@sveltejs/kit";
import bcrypt from 'bcrypt'
import { db } from "$lib/prisma";

// 以下、ts利用例
// import type { Actions } from "./$types";

export const actions = {
  // 引数は、元は、RequestEvent(event)が渡される。
    // その中から、分割代入「const { request } = event」で、requestを設定
  register : async ({request}) => {
    const data = await request.formData();
    const name = data.get("name");
    const password = data.get("password");
    if (!name || !password) {
      return fail(400, { message: "名前・パスワードは必須です。" });
    }

    const user = await db.user.findUnique({
      // 以下は、オブジェクトリテラルの強化({ name: name })
      where: { name }
    });
    if (user) {
      return fail(400, { message: "既に存在するユーザーです。" });
    }

    // 既に存在する名前かデータベースに検索をかけます。存在しているならfail関数を返します。
    // 存在していないユーザーなら、Createで名前とハッシュ化したパスワード・トークンを登録します。
    await db.user.create({
      // name => 「name: name」
      data: {
        name,
        // パスワードのセキュリティを上げるために、ハッシュに変換
          // ハッシュとは、データを不可逆変換して置き換える
            // 第一引数: ハッシュ化したい文字列
            // 第二引数: 何回ハッシュ化するか
        password:  await bcrypt.hash(password, 10),
        // 暗号強度の強い乱数生成器を用いて v4 UUID を生成
          // 例) "36b8f84d-df4e-4d49-b662-bcde71a8764f"
        authToken: crypto.randomUUID(),
      },
    });

    // ログイン画面にリダイレクト
    throw redirect(303, '/login');
  }
}

// 以下、ts利用例
// export const actions: Actions = {
//   register : async ({request}) => {
//     const data = await request.formData();
//     const name = data.get("name");
//     const password = data.get("password");

//     if (typeof name !== "string" ||typeof password !== "string" || !name || !password) {
//       return fail(400, { message: "名前・パスワードは必須です。" })
//     }

//     const user = await db.user.findUnique({
//       where: {name}
//     })

//     if (user) {
//       return fail(400, { message: "既に存在するユーザーです。" })
//     }

//     await db.user.create({
//       data: {
//         name,
//         password : await bcrypt.hash(password, 10),
//         authToken: crypto.randomUUID(),
//       },
//     })

//     throw redirect(303, '/login')
//   }
// }
