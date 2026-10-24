import { getPosts } from '#lib/posts';
import { site } from '#lib/site';

// 构建时生成静态 rss.xml
export const prerender = true;

function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

/** YYYY-MM-DD → RFC 822，RSS 的 pubDate 需要这种格式。 */
function toRfc822(date: string): string {
	const [year, month, day] = date.split('-').map(Number);
	return new Date(Date.UTC(year, month - 1, day, 8, 0, 0)).toUTCString();
}

export const GET = () => {
	const posts = getPosts();

	const items = posts
		.map((post) => {
			const url = `${site.url}/blog/${post.slug}`;
			return [
				'    <item>',
				`      <title>${escapeXml(post.title)}</title>`,
				`      <link>${url}</link>`,
				`      <guid isPermaLink="true">${url}</guid>`,
				`      <pubDate>${toRfc822(post.date)}</pubDate>`,
				`      <description>${escapeXml(post.description)}</description>`,
				...post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
				'    </item>'
			].join('\n');
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)} 的博客</title>
    <link>${site.url}</link>
    <description>${escapeXml(site.description)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

	return new Response(xml, {
		headers: {
			'content-type': 'application/rss+xml; charset=utf-8',
			'cache-control': 'public, max-age=3600'
		}
	});
};
