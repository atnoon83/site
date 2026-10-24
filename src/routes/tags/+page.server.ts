import { getTags } from '#lib/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return {
		title: '标签',
		description: '按标签浏览全部文章。',
		tags: getTags()
	};
};
