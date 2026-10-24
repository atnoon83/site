import { error } from '@sveltejs/kit';
import { getTags } from '#lib/posts';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => getTags().map(({ tag }) => ({ tag }));

export const load: PageServerLoad = ({ params }) => {
	const entry = getTags().find(({ tag }) => tag === params.tag);
	if (!entry) {
		error(404, '标签不存在');
	}

	return {
		title: `标签：${entry.tag}`,
		description: `所有带有「${entry.tag}」标签的文章。`,
		tag: entry.tag,
		posts: entry.posts
	};
};
