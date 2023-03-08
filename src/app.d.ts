// TypeScriptでの型定義ファイル

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			// userを型定義
			// 「src/hooks.server.js」での部分取得の際に必要になる
			user: {
				id: string;
				name: string;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
