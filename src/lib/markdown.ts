import hljs from 'highlight.js/lib/common';
import { Marked, type Renderer, type Tokens } from 'marked';

export interface Heading {
	id: string;
	text: string;
	depth: number;
}

export interface RenderedMarkdown {
	html: string;
	headings: Heading[];
}

/** 生成标题锚点用的 slug，保留中英文和数字。 */
function slugify(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\p{L}\p{N}\s-]/gu, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
}

// 每次渲染重置，用于收集标题和去重锚点。
let headings: Heading[] = [];
let usedIds = new Map<string, number>();

const marked = new Marked({
	gfm: true,
	breaks: false,
	pedantic: false
});

marked.use({
	renderer: {
		heading(this: Renderer, { tokens, depth }: Tokens.Heading) {
			const inner = this.parser.parseInline(tokens);
			const plain = inner.replace(/<[^>]+>/g, '');
			const base = slugify(plain) || 'section';
			const seen = usedIds.get(base) ?? 0;
			const id = seen === 0 ? base : `${base}-${seen}`;
			usedIds.set(base, seen + 1);

			if (depth === 2 || depth === 3) {
				headings.push({ id, text: plain, depth });
			}

			return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
		},

		code({ text, lang }: Tokens.Code) {
			const language = (lang ?? '').trim().split(/\s+/)[0];
			const known = language && hljs.getLanguage(language) ? language : '';
			const body = known
				? hljs.highlight(text, { language: known, ignoreIllegals: true }).value
				: hljs.highlightAuto(text).value;
			const className = known ? `hljs language-${known}` : 'hljs';
			return `<pre class="code-block"><code class="${className}">${body}</code></pre>\n`;
		},

		link(this: Renderer, { href, title, tokens }: Tokens.Link) {
			const text = this.parser.parseInline(tokens);
			const external = /^[a-z][a-z\d+.-]*:\/\//i.test(href);
			const titleAttr = title ? ` title="${title.replace(/"/g, '&quot;')}"` : '';
			if (external) {
				return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
			}
			return `<a href="${href}"${titleAttr}>${text}</a>`;
		}
	}
});

/** 把 Markdown 渲染成 HTML，同时返回 h2/h3 标题用于目录。 */
export function renderMarkdown(markdown: string): RenderedMarkdown {
	headings = [];
	usedIds = new Map();
	const html = marked.parse(markdown) as string;
	return { html, headings };
}
