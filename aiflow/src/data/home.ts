import type { NavigationItem } from './navigation';
export type CardIcon = 'knowledge' | 'film' | 'video' | 'training' | 'presentation' | 'capture' | 'inspection';
export interface Business { title: string; href: string; icon: CardIcon; links: NavigationItem[]; }
const scenes = [
  ['投放搭建', 'campaign-setup'], ['上线验收', 'launch-review'],
  ['数据回收', 'data-collection'], ['结案交付', 'closing'],
];
export const businesses: Business[] = [
  {title:'智能知识库',href:'/workspace/knowledge/',icon:'knowledge',links:[{label:'知识检索',href:'/workspace/knowledge/search/'},{label:'AI 问答',href:'/workspace/knowledge/qa/'},{label:'新人培训',href:'/workspace/knowledge/training/'}]},
  ...[['长视频', 'long-video'], ['短视频', 'short-video']].map(([title, slug]) => ({
    title, href: `/workspace/${slug}/`, icon: (slug === 'long-video' ? 'film' : 'video') as CardIcon,
    links: scenes.map(([label, scene]) => ({ label, href: `/workspace/${slug}/${scene}/`, pending: true })),
  })),

];
export interface AppSummary { name: string; href: string; category: string; icon: CardIcon; status?: string; description?: string; }
export const featuredApps: AppSummary[] = [
  { name: '监播 PPT 排版 V5', href: '/workspace/apps/ppt-v5/', category: '结案交付', icon: 'presentation', status: '可下载', description: '按命名与顺序整理截图，生成监播 PPT。' },
  { name: '创意拷屏预览', href: '/workspace/apps/preview-capture/', category: '上线验收', icon: 'capture', status: '已有入口', description: '手机自动扫码，收集广告创意预览。' },
  { name: '品专巡查', href: '/workspace/apps/brand-inspection/', category: '投放核查', icon: 'inspection', status: '已有入口', description: '逐一核查品专词包，记录异常并反馈媒体核查。' },
  { name: '智能项目管家', href: '/workspace/apps/project-manager/', category: '投放搭建', icon: 'training', status: '配置使用', description: '记录投放任务，跟踪项目执行进度。' },
  { name: '长视频数据更新', href: '/workspace/apps/long-video-data/', category: '数据回收', icon: 'film', status: '已有入口', description: '自动获取并更新长视频投放数据。' },
];
