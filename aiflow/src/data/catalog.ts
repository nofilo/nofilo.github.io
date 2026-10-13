import { knowledgeEntries } from './knowledge';
export interface CatalogApp { id:string; name:string; business:string; scene:string; type:string; status: "待开发" | "待上线" | "已上线"; accessNote?:string; href?:string; desc:string; input:string; output:string; owner?:string; documentUrl?:string; platforms:string[]; }
const businessApps: CatalogApp[] = [
  {
    "id": "ai-selection",
    "name": "AI 辅助选点",
    "business": "long-video",
    "scene": "campaign-setup",
    "type": "Web 应用",
    "status": "待上线",
    "desc": "根据品牌需求，辅助寻找视频投放点位。",
    "input": "视频素材、品牌需求",
    "output": "候选点位与选点结果",
    "platforms": []
  },
  {
    "id": "project-manager",
    "name": "智能项目管家",
    "business": "long-video",
    "scene": "campaign-setup",
    "type": "飞书应用",
    "status": "待上线",
    "desc": "记录投放任务，跟踪项目执行进度。",
    "input": "项目资料、投放任务",
    "output": "任务记录与跟踪视图",
    "platforms": [
      "飞书"
    ],
    "accessNote": "配置使用"
  },
  {
    "id": "monitor-capture",
    "name": "秒针监播采集",
    "business": "long-video",
    "scene": "launch-review",
    "type": "影刀 RPA",
    "status": "待上线",
    "desc": "采集监播截图，整理投放验收材料。",
    "input": "监播任务与采集条件",
    "output": "监播截图",
    "owner": "乔文心",
    "platforms": [
      "影刀",
      "秒针"
    ],
    "accessNote": "联系获取"
  },
  {
    "id": "long-video-data",
    "name": "长视频数据更新",
    "business": "long-video",
    "scene": "data-collection",
    "type": "影刀 RPA",
    "status": "已上线",
    "desc": "自动获取并更新长视频投放数据。",
    "input": "投放项目与数据来源",
    "output": "更新后的项目数据",
    "platforms": [
      "影刀"
    ],
    "accessNote": "已有入口"
  },
  {
    "id": "ai-daily-report",
    "name": "AI 数据日报",
    "business": "long-video",
    "scene": "data-collection",
    "type": "AI Agent",
    "status": "待开发",
    "desc": "汇总长视频投放数据，辅助生成每日分析。",
    "input": "投放数据与日报要求",
    "output": "数据日报",
    "platforms": []
  },
  {
    "id": "ai-closing-copy",
    "name": "AI 结案话术",
    "business": "long-video",
    "scene": "closing",
    "type": "AI Agent",
    "status": "待开发",
    "desc": "根据项目表现，辅助整理结案总结话术。",
    "input": "项目数据与结案重点",
    "output": "结案总结话术",
    "platforms": []
  },
  {
    "id": "ppt-v5",
    "name": "监播 PPT 排版 V5",
    "business": "long-video",
    "scene": "closing",
    "type": "桌面工具",
    "status": "已上线",
    "desc": "按命名与顺序整理截图，生成监播 PPT。",
    "input": "按要求命名的监播图片",
    "output": "既定格式的监播 PPT",
    "platforms": [
      "Windows"
    ],
    "accessNote": "可下载"
  },
  {
    "id": "ad-plan",
    "name": "自动搭建广告计划",
    "business": "short-video",
    "scene": "campaign-setup",
    "type": "API 应用",
    "status": "待开发",
    "desc": "通过巨量平台接口批量创建预定单与广告计划。",
    "input": "投放参数与计划信息",
    "output": "批量广告计划",
    "platforms": [
      "巨量平台"
    ]
  },
  {
    "id": "ad-change",
    "name": "自动撤改单",
    "business": "short-video",
    "scene": "campaign-setup",
    "type": "API 应用",
    "status": "待开发",
    "desc": "通过巨量平台接口批量处理广告计划撤销与修改。",
    "input": "待撤改计划与变更要求",
    "output": "撤改结果",
    "platforms": [
      "巨量平台"
    ]
  },
  {
    "id": "creative-builder",
    "name": "自动搭建创意",
    "business": "short-video",
    "scene": "campaign-setup",
    "type": "API 应用",
    "status": "待开发",
    "desc": "通过巨量平台接口批量创建创意并复核信息。",
    "input": "创意素材与广告配置",
    "output": "广告创意与复核结果",
    "platforms": [
      "巨量平台"
    ]
  },
  {
    "id": "platform-order-entry",
    "name": "平台智能录单",
    "scene": "campaign-setup",
    "documentUrl": "https://support.oceanengine.com/support/content/207442?mappingType=2&pageId=461&spaceId=252&timestamp=1775109819828&visitor_source=help_main_site",
    "desc": "巨量平台智能录单工具，先查看官方介绍与使用说明。",
    "business": "short-video",
    "type": "平台工具",
    "status": "待上线",
    "input": "以工具介绍文档为准",
    "output": "以工具介绍文档为准",
    "platforms": [
      "巨量平台"
    ],
    "accessNote": "接入待定"
  },
  {
    "id": "qr-download",
    "name": "二维码自动下载",
    "business": "short-video",
    "scene": "launch-review",
    "type": "API 应用",
    "status": "待开发",
    "desc": "集中获取巨量平台广告创意的预览二维码。",
    "input": "广告计划与创意标识",
    "output": "预览二维码",
    "platforms": [
      "巨量平台"
    ]
  },
  {
    "id": "preview-capture",
    "name": "开屏-创意拷屏预览",
    "business": "short-video",
    "scene": "launch-review",
    "type": "影刀 RPA",
    "status": "已上线",
    "desc": "手机自动扫码，收集开屏广告创意预览。",
    "input": "广告预览二维码",
    "output": "创意预览截图",
    "platforms": [
      "影刀"
    ],
    "accessNote": "已有入口"
  },
  {
    "id": "preview-capture-feed",
    "name": "信息流-创意拷屏预览",
    "business": "short-video",
    "scene": "launch-review",
    "type": "影刀 RPA",
    "status": "已上线",
    "desc": "手机自动扫码，收集信息流广告创意预览。",
    "input": "广告预览二维码",
    "output": "创意预览截图",
    "platforms": [
      "影刀"
    ],
    "accessNote": "已有入口"
  },
  {
    "id": "preview-capture-seeding",
    "name": "种草通-创意拷屏预览",
    "business": "short-video",
    "scene": "launch-review",
    "type": "影刀 RPA",
    "status": "已上线",
    "desc": "手机自动扫码，收集种草通广告创意预览。",
    "input": "广告预览二维码",
    "output": "创意预览截图",
    "platforms": [
      "影刀"
    ],
    "accessNote": "已有入口"
  },
  {
    "id": "brand-inspection",
    "name": "品专巡查",
    "business": "short-video",
    "scene": "launch-review",
    "type": "影刀 RPA",
    "status": "已上线",
    "desc": "逐一核查品专词包，记录异常并反馈媒体核查。",
    "input": "品专词包与核查要求",
    "output": "巡查记录与异常反馈",
    "platforms": [
      "影刀",
      "飞书"
    ],
    "accessNote": "已有入口"
  },
  {
    "id": "fulfillment-assistant",
    "name": "履约小助手",
    "scene": "launch-review",
    "documentUrl": "https://bytedance.larkoffice.com/docx/G63PdZqRnoDmx9xdhZEcbcVNnTd?from=from_copylink",
    "desc": "巨量平台履约工具，先查看工具介绍文档。",
    "business": "short-video",
    "type": "平台工具",
    "status": "待上线",
    "input": "以工具介绍文档为准",
    "output": "以工具介绍文档为准",
    "platforms": [
      "巨量平台"
    ],
    "accessNote": "接入待定"
  },
  {
    "id": "short-daily-report",
    "name": "数据日报更新",
    "business": "short-video",
    "scene": "data-collection",
    "type": "脚本",
    "status": "待开发",
    "desc": "整理最新短视频投放数据，更新日报。",
    "input": "最新投放数据与日报模板",
    "output": "更新后的日报",
    "platforms": []
  },
  {
    "id": "delivery-data",
    "name": "投放数据自动下载",
    "business": "short-video",
    "scene": "data-collection",
    "type": "API 应用",
    "status": "待开发",
    "desc": "获取巨量平台小时数据，生成报告与日终汇总。",
    "input": "投放计划与数据范围",
    "output": "小时报告与当日汇总",
    "platforms": [
      "巨量平台"
    ]
  },
  {
    "id": "closing-report",
    "name": "文字版结案报告生成",
    "business": "short-video",
    "scene": "closing",
    "type": "AI Agent",
    "status": "待开发",
    "desc": "根据投放数据与执行记录，生成文字版结案报告。",
    "input": "投放数据与执行记录",
    "output": "文字版结案报告",
    "platforms": []
  },
  {
    "id": "asset-library",
    "name": "资产沉淀",
    "business": "short-video",
    "scene": "closing",
    "type": "Skills",
    "status": "待开发",
    "desc": "沉淀结案经验、交付规范与可复用执行方法。",
    "input": "结案材料与执行经验",
    "output": "可复用 Skills 与业务资产",
    "platforms": []
  },
  {
    "id": "short-closing",
    "name": "结案生成",
    "business": "short-video",
    "scene": "closing",
    "type": "桌面工具",
    "status": "待上线",
    "desc": "整理结案材料，按客户要求生成交付文件。",
    "input": "结案材料与模板要求",
    "output": "结案交付文件",
    "platforms": [],
    "accessNote": "适配待确认"
  }
];
export const scenes = [["campaign-setup", "投放搭建"], ["launch-review", "上线验收"], ["data-collection", "数据回收"], ["closing", "结案交付"]];
export const businessNames: Record<string,string> = {"knowledge":"知识百宝箱","long-video":"长视频","short-video":"短视频"};

export const apps: CatalogApp[] = [...knowledgeEntries.map(entry => ({id:`knowledge-${entry.slug}`, name:entry.title, business:"knowledge", scene:entry.slug, type:entry.type, status:entry.status, desc:entry.description, input:"以介绍页面为准", output:"以介绍页面为准", platforms:entry.href?["飞书"]:[], href:`/aiflow/workspace/knowledge/${entry.slug}/`})), ...businessApps];
