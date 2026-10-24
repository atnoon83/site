/**
 * 站点信息集中配置。
 * 这里的值目前都是占位符，替换成你自己的信息即可，其他地方会自动跟着变。
 */
export interface SocialLink {
	/** 显示名称，例如 GitHub、邮箱 */
	label: string;
	/** 链接地址，例如 https://github.com/your-name 或 mailto:you@example.com */
	href: string;
}

export const site = {
	name: '你的名字',
	/** 姓名下方的身份标签，例如「前端工程师」 */
	role: '全栈开发者',
	/** 一句话介绍 */
	tagline: '写代码，也写点别的。',
	/** 首页和 SEO 用的简介 */
	description: '个人主页与博客，记录技术笔记、阅读和日常思考。',
	/** 部署后的正式域名，用于生成 RSS 和绝对链接 */
	url: 'https://example.com',
	/** 页脚版权署名，留空则使用 name */
	copyright: '你的名字',
	socials: [
		{ label: 'GitHub', href: 'https://github.com/your-name' },
		{ label: '邮箱', href: 'mailto:you@example.com' },
		{ label: 'RSS', href: '/rss.xml' }
	] satisfies SocialLink[]
};

export const navigation = [
	{ label: '首页', href: '/' },
	{ label: '博客', href: '/blog' },
	{ label: '标签', href: '/tags' },
	{ label: '关于', href: '/about' }
];
