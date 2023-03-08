import { db } from "$lib/prisma";
import { fail, error } from "@sveltejs/kit";

// 以下、ts利用例
// import type { PageServerLoad } from "./$types";

// paramsには、「{ postId : { id } }」が入っている
export const load = async ({ params } ) => {
  const threadDetail = await db.post.findUnique({
    where: {
      id : Number(params.postId)
    },
    // includeは、関連するデータを一緒に取得するために用いられる
    include: {
      // Commentテーブルからは、コメントと作成日時、作成者を
      Comment : {
        orderBy: { id : 'desc'},
        select: {
          content: true,
          created_at: true,
          user: {
            select:{
              name: true
            }
          }
        }
      },
      // Userテーブルからは、このスレッドの作成者を
      user: {
        select: {
          name: true
        }
      },
    },
  });

  // 想定されるエラー(Expected errors)の中でも、validation_errorでないもの
  if(!threadDetail) throw error(404, { message: "存在しないスレッドです。" });

  return { threadDetail } ;
}

export const actions = {
  comment: async ({ request, locals, params }) => {
    const data = await request.formData();
    const comment = data.get("comment");

    if (!comment) {
      // 想定されるエラー(Expected errors)の中でも、validation_errorのもの
      return fail(400, { message: "コメントは必須入力です。" });
    }

    await db.comment.create({
      data: {
        // 「board_app/src/hooks.server.js」にて、event.localsに格納された情報を利用
        userId: locals.user.id,
        postId: Number(params.postId),
        content: comment,
      }
    });
  },
}

// 以下、ts利用例
// export const load: PageServerLoad = async ({ params} ) => {
//   const threadDetail = await db.post.findUnique({
//     where: {
//       id : Number(params.postId)
//     },
//     include: {
//       Comment : {
//         orderBy: { id : 'desc'},
//         select: {
//           content: true,
//           created_at: true,
//           user: {
//             select:{
//               name: true
//             }
//           }
//         }
//       },
//       user: {
//         select: {
//           name: true
//         }
//       },
//     },
//   });

//   if(!threadDetail) throw fail(404, {message: "存在しないスレッドです。"});

//   return { threadDetail } ;
// }

// export const actions: Actions = {
//   comment: async ({request,locals, params}) => {
//     const data = await request.formData();
//     const comment = data.get("comment");

//     if (typeof comment != "string" || !comment) {
//       return fail(400, { message: "コメントは必須入力です。" });
//     }

//     await db.comment.create({
//       data: {
//         userId: locals.user.id,
//         postId: Number(params.postId),
//         content: comment
//       }
//     });
//   },
// }
