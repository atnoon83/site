// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			/** 页面标题，由各个 +page.ts 提供 */
			title?: string;
			/** 页面描述，用于 meta description 与分享卡片 */
			description?: string;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
