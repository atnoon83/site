import matter from 'gray-matter';
import { renderMarkdown, type Heading } from './markdown';

export interface PostMeta {
	slug: string;
	title: string;
	/** YYYY-MM-DD */
	date: string;
	updated?: string;
	description: string;
	tags: string[];
	draft: boolean;
	/** 预计阅读分钟数 */
	readingMinutes: number;
}

export interface Post extends PostMeta {
	html: string;
	headings: Heading[];
}

// 构建时把所有 Markdown 原文内联进来：它既能在开发服务器里用，
// 也能在 prerender 时直接可用，部署后不需要再读文件系统。
const sources = import.meta.glob('/src/posts/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

function toIsoDate(value: unknown, file: string): string {
	if (value instanceof Date) return value.toISOString().slice(0, 10);
	if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value.slice(0, 10))) {
		return value.slice(0, 10);
	}
	throw new Error(`文章 ${file} 的 date 必须写成 YYYY-MM-DD 格式`);
}

function readingMinutes(content: string): number {
	const cjk = (content.match(/[\u4e00-\u9fff]/g) ?? []).length;
	const words = content
		.replace(/[\u4e00-\u9fff]/g, ' ')
		.split(/\s+/)
		.filter(Boolean).length;
	return Math.max(1, Math.round(cjk / 350 + words / 200));
}

function parsePost(path: string, raw: string): Post {
	const file = path.split('/').pop() ?? path;
	const slug = file.replace(/\.md$/, '');
	const { data, content } = matter(raw);

	if (!data.title || typeof data.title !== 'string') {
		throw new Error(`文章 ${file} 缺少 title`);
	}

	const meta: PostMeta = {
		slug,
		title: data.title,
		date: toIsoDate(data.date, file),
		updated: data.updated ? toIsoDate(data.updated, file) : undefined,
		description: typeof data.description === 'string' ? data.description : '',
		tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
		draft: data.draft === true,
		readingMinutes: readingMinutes(content)
	};

	const { html, headings } = renderMarkdown(content);
	return { ...meta, html, headings };
}

let cache: Post[] | undefined;

/** 所有已发布文章，按日期从新到旧。 */
export function getPosts(): Post[] {
	if (!cache) {
		cache = Object.entries(sources)
			.map(([path, raw]) => parsePost(path, raw))
			.filter((post) => import.meta.env.DEV || !post.draft)
			.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
	}
	return cache;
}

/** 只要列表展示需要的字段，避免把整篇 HTML 传进页面数据。 */
export function getPostList(): PostMeta[] {
	return getPosts().map(({ html: _html, headings: _headings, ...meta }) => meta);
}

export function getPost(slug: string): Post | undefined {
	return getPosts().find((post) => post.slug === slug);
}

/** 相邻文章，用于文末上一篇 / 下一篇。 */
export function getAdjacent(slug: string): { newer?: PostMeta; older?: PostMeta } {
	const posts = getPosts();
	const index = posts.findIndex((post) => post.slug === slug);
	if (index === -1) return {};
	const strip = ({ html: _html, headings: _headings, ...meta }: Post): PostMeta => meta;
	return {
		newer: index > 0 ? strip(posts[index - 1]) : undefined,
		older: index < posts.length - 1 ? strip(posts[index + 1]) : undefined
	};
}

/** 标签 → 文章列表，按标签使用次数从多到少。 */
export function getTags(): { tag: string; posts: PostMeta[] }[] {
	const map = new Map<string, PostMeta[]>();
	for (const post of getPosts()) {
		const { html: _html, headings: _headings, ...meta } = post;
		for (const tag of post.tags) {
			const list = map.get(tag) ?? [];
			list.push(meta);
			map.set(tag, list);
		}
	}
	return [...map.entries()]
		.map(([tag, posts]) => ({ tag, posts }))
		.sort((a, b) => b.posts.length - a.posts.length || a.tag.localeCompare(b.tag, 'zh'));
}

/** 标签相关文章：共同标签越多越靠前。 */
export function getRelated(post: Post, limit = 3): PostMeta[] {
	const tags = new Set(post.tags);
	return getPostList()
		.filter((candidate) => candidate.slug !== post.slug)
		.map((candidate) => ({
			candidate,
			score: candidate.tags.filter((tag) => tags.has(tag)).length
		}))
		.filter(({ score }) => score > 0)
		.sort((a, b) => b.score - a.score || (a.candidate.date < b.candidate.date ? 1 : -1))
		.slice(0, limit)
		.map(({ candidate }) => candidate);
}
