/**
 * 把日期字符串（YYYY-MM-DD）格式化成中文展示形式。
 * 不用 Intl，避免构建机和读者时区不同导致的日期漂移。
 */
export function formatDate(iso: string): string {
	const [year, month, day] = iso.slice(0, 10).split('-').map(Number);
	if (!year || !month || !day) return iso;
	return `${year}年${month}月${day}日`;
}

/** 取年份，用于列表按年分组。 */
export function yearOf(iso: string): string {
	return iso.slice(0, 4);
}
