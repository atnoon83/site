import { getPostList } from '#lib/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	const posts = getPostList();
	return {
		title: '博客',
		description: '技术笔记、阅读记录和日常思考。',
		posts
	};
};
