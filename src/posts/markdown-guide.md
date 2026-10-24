---
title: 用 Markdown 写博客：这个站的写作约定
date: 2026-10-20
description: 记录本博客的 frontmatter 字段、目录生成、标签和 RSS 的工作方式，方便以后自己回来看。
tags:
  - 建站
  - Markdown
---

这个站的文章都存在 `src/posts` 目录下，一个 `.md` 文件就是一篇文章，文件名就是 URL 里的 slug。
比如 `hello-world.md` 对应 `/blog/hello-world`。

## frontmatter 字段

每篇文章开头是一段 YAML，目前支持这些字段：

| 字段 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `title` | string | 是 | 文章标题，显示在列表和详情页 |
| `date` | 日期 | 是 | 发布日期，格式 `YYYY-MM-DD`，用于排序 |
| `updated` | 日期 | 否 | 更新日期，填了会在详情页显示 |
| `description` | string | 否 | 摘要，用于列表、SEO 和 RSS |
| `tags` | string[] | 否 | 标签，会自动生成标签页 |
| `draft` | boolean | 否 | 设为 `true` 时只在开发环境可见 |

一个完整的例子：

```yaml
---
title: 一篇文章的标题
date: 2026-10-20
updated: 2026-10-24
description: 一句话说明这篇文章讲什么。
tags:
  - 建站
  - Markdown
draft: false
---
```

## 目录是怎么来的

渲染 Markdown 时，标题会自动加上锚点 id，`##` 和 `###` 会被收集成文末的目录。
中文标题也能生成锚点——标点会被去掉，空格变成连字符。

## 标签和 RSS

标签不用单独配置。所有文章 frontmatter 里的 `tags` 会汇总到 `/tags`，
每个标签有自己的页面，按标签可以筛出文章列表。

RSS 在 `/rss.xml`，构建时生成，包含最近所有文章的标题、链接、摘要和分类。

## 加一篇新文章

1. 在 `src/posts` 新建一个 `.md` 文件，文件名用英文短横线格式；
2. 填好 frontmatter；
3. `npm run dev` 预览，`npm run build` 确认能构建。

就这样，不需要改任何配置。
