import { site } from '#lib/site';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		title: '关于',
		description: `关于 ${site.name}：做过什么、在写什么、怎么联系。`
	};
};
