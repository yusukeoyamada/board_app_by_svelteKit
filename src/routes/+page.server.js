import { db } from "$lib/prisma"
// 以下、ts利用例
// import type { PageServerLoad } from "./$types";

export const load = async () => {
  // postテーブルから、id降順で全件取得
  const threads = await db.post.findMany({
    orderBy:{ id: 'desc' },
  });

  return { threads };
}

// 以下、ts利用例
// export const load: PageServerLoad = async () => {
//   const threads = await db.post.findMany({
//     orderBy:{ id: 'desc' },
//   });

//   return {threads};
// }
