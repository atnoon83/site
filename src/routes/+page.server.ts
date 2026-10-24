import { getPostList } from '#lib/posts';
import { site } from '#lib/site';
import type { PageServerLoad } from './$types';

/**
 * 用 server load 而不是 universal load：解析 Markdown 依赖 Node 的 Buffer，
 * 不能进浏览器包。页面是预渲染的，构建时跑一次就够了。
 */
export const load: PageServerLoad = () => {
	return {
		title: `${site.name} · ${site.role}`,
		description: site.description,
		posts: getPostList().slice(0, 5)
	};
};
