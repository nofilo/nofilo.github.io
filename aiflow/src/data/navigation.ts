export interface NavigationItem { label: string; href: string; pending?: boolean; }
export const navigation: NavigationItem[] = [
  { label: '首页', href: '/aiflow/' },
  { label: '工作区', href: '/aiflow/workspace/' },
  { label: '我的', href: '/aiflow/me/' },
];
export const helpLinks: NavigationItem[] = [
  { label: '使用指南', href: '/aiflow/me/help/guides/' },
  { label: '更新日志', href: '/aiflow/me/help/changelog/' },
];
