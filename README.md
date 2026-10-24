# 个人主页 & 博客

一个用 **SvelteKit + TypeScript** 写的个人主页，带博客、标签和 RSS。
构建时全站静态预渲染，运行时是一个很小的 Node 服务，可以直接 Docker 部署。

- 首页 / 博客列表 / 文章详情 / 标签页 / 关于页 / 404 页
- 文章用 Markdown 编写，frontmatter 提供标题、日期、摘要、标签、草稿等元信息
- 文章自动生成目录锚点，代码块语法高亮（构建时完成，前端不加载高亮库）
- 明暗主题切换，默认跟随系统，选择记在 `localStorage`
- `/rss.xml` 构建时生成，零运行时依赖

## 技术栈

| 用途 | 选型 |
| --- | --- |
| 框架 | SvelteKit 3（Svelte 5，runes 模式） |
| 语言 | TypeScript |
| 构建 | Vite 8 |
| Markdown | marked + gray-matter |
| 代码高亮 | highlight.js（只引入常用语言） |
| 部署 | adapter-node + Docker |

## 目录结构

```
src/
├─ app.css              # 全局样式与设计变量（明暗主题都在这里）
├─ app.html             # HTML 外壳，含首屏防闪烁的主题脚本
├─ app.d.ts             # App.PageData 类型
├─ lib/
│  ├─ site.ts           # 站点信息：名字、简介、社交链接、导航 ← 先改这里
│  ├─ posts.ts          # 读取 Markdown、排序、标签、相关文章
│  ├─ markdown.ts       # Markdown → HTML，标题锚点与代码高亮
│  ├─ format.ts         # 日期格式化
│  └─ components/       # Header / Footer / 主题切换 / 文章列表 / 标签
├─ posts/               # 文章：一篇 = 一个 .md 文件
└─ routes/
   ├─ +layout.ts        # prerender = true（全站预渲染）
   ├─ +layout.svelte    # 页头页脚与 SEO meta
   ├─ +page.server.ts   # 首页数据（服务端 load，构建时执行）
   ├─ +page.svelte      # 首页
   ├─ blog/             # 博客列表与 [slug] 详情（+page.server.ts 读 Markdown）
   ├─ tags/             # 标签总览与 [tag] 列表
   ├─ about/            # 关于
   ├─ rss.xml/          # RSS（+server.ts）
   └─ +error.svelte     # 404 等错误页
static/                 # favicon、robots.txt 等原样拷贝的静态文件
```

## 本地开发

需要 Node.js 22+。

```bash
npm install
npm run dev        # http://localhost:5173
```

其他命令：

```bash
npm run check      # 类型检查（svelte-check）
npm run build      # 构建，产物在 build/
npm run preview    # 预览生产构建
```

## 写一篇文章

在 `src/posts/` 下新建 `my-post.md`，文件名就是 URL：`/blog/my-post`。

```markdown
---
title: 文章标题
date: 2026-10-24
updated: 2026-10-25      # 可选
description: 一句话摘要，用于列表、SEO 和 RSS。
tags:
  - Svelte
  - 笔记
draft: false             # 可选，true 时只在开发环境显示
---

正文从这里开始，支持 GFM：表格、任务列表、删除线等。
```

字段说明：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `title` | 是 | 文章标题 |
| `date` | 是 | 发布日期，`YYYY-MM-DD`，用于排序 |
| `updated` | 否 | 更新日期，填了会在页面上显示 |
| `description` | 否 | 摘要 |
| `tags` | 否 | 标签数组，自动生成标签页 |
| `draft` | 否 | `true` 时生产构建不输出该文章 |

`##` / `###` 标题会自动生成锚点并汇总成文章开头的目录。代码块用三个反引号加语言名，构建时高亮。

## 改成你自己的站

1. 修改 `src/lib/site.ts`：名字、身份、简介、社交链接、`url`（用于 RSS 和 canonical，部署后填真实域名）。
2. 替换 `src/routes/about/+page.svelte` 里的自我介绍。
3. 删除 `src/posts/` 里的示例文章，写自己的。
4. 换掉 `static/favicon.svg`。

## 主题

- 首次访问跟随系统 `prefers-color-scheme`；
- 点右上角按钮切换，结果存到 `localStorage`；
- `app.html` 里有一段内联脚本在首屏渲染前应用主题，避免闪白；
- 配色全部是 `app.css` 顶部的 CSS 变量，改 `--bg`、`--text`、`--accent` 即可。

## Docker 部署

构建并运行：

```bash
docker build -t my-site .
docker run -d --name my-site -p 3000:3000 my-site
```

国内网络可以在构建时换镜像源：

```bash
docker build --build-arg NPM_REGISTRY=https://registry.npmmirror.com -t my-site .
```

运行时环境变量（adapter-node）：

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `PORT` | `3000` | 监听端口 |
| `HOST` | `0.0.0.0` | 监听地址 |
| `ORIGIN` | — | 站点完整地址，如 `https://example.com`。反向代理后面建议设置 |
| `BODY_SIZE_LIMIT` | `512K` | 请求体大小上限（纯静态站用不到，可不管） |

放在 Nginx / Caddy 后面时，把请求转发到容器 `3000` 端口，并设置 `ORIGIN` 为对外域名。

不想用 Docker 也可以直接跑构建产物：

```bash
npm run build
node build
```

## 说明

- 全站 `prerender = true`：构建时生成所有 HTML，运行时只做静态文件服务，不需要数据库或文件系统里的 Markdown。
- 页面数据全部走 `+page.server.ts` 的 server load：解析 Markdown 依赖 Node 的 `Buffer`，打包进浏览器会崩，放在服务端既正确又让客户端不下载 marked / gray-matter。
- 因此新增文章后需要重新构建（或重启开发服务器），这也是静态站点的取舍。
- 示例文章和占位信息只是让站点能跑起来，发布前记得替换。
