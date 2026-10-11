export interface NavigationItem { label: string; href: string; pending?: boolean; }
export const navigation: NavigationItem[] = [
  { label: '首页', href: '/' },
  { label: '工作区', href: '/workspace/' },
  { label: '我的', href: '/me/' },
];
export const helpLinks: NavigationItem[] = [
  { label: '使用指南', href: '/me/help/guides/' },
  { label: '更新日志', href: '/me/help/changelog/' },
];
