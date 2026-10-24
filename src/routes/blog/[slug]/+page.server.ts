import { error } from '@sveltejs/kit';
import { getAdjacent, getPost, getPostList, getRelated } from '#lib/posts';
import type { EntryGenerator, PageServerLoad } from './$types';

/** 预渲染：构建时列出所有文章 slug。 */
export const entries: EntryGenerator = () => getPostList().map(({ slug }) => ({ slug }));

export const load: PageServerLoad = ({ params }) => {
	const post = getPost(params.slug);
	if (!post) {
		error(404, '文章不存在');
	}

	return {
		title: post.title,
		description: post.description,
		post,
		adjacent: getAdjacent(post.slug),
		related: getRelated(post)
	};
};
