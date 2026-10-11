# 广告执行部 · AI 提效平台

## 当前范围

桌面网页：首页、全局组件和工作区。工作区包含 38 个静态地址（含 12 个应用详情及各自说明页）。支持 1024px 及以上桌面窗口。我的、管理与系统页面待确认。

## 本地运行

需要 Node.js 22.12+，推荐 Node.js 24 LTS。

```sh
npm ci
npm run dev
```

预览地址：http://127.0.0.1:4321/

```sh
npm run check
npm run build
npm run verify
npm run preview
```

未实现页面的入口保留目标路径配置，但在本次首页预览中显示明确的准备中提示。后续页面完成后，将对应 `pending` 改为 `false` 并验证路由。已配置用户提供的 3 个影刀分享跳转；没有接通登录、提需、下载、任务执行服务。收藏仅保存到当前浏览器。

## 目录

- `src/components/`：导航、页脚、容器、按钮、链接、卡片、面包屑、标题、标签、表单、空状态与分类导航。
- `src/components/home/`：首页首屏。
- `src/layouts/`：全站页面框架。
- `src/data/`：公开内容与入口配置。
- `src/styles/`：全局视觉变量和样式。
- `src/scripts/`：渐进增强交互。
- `src/pages/`：首页与工作区静态路由。
- `public/assets/`：背景图、字体及许可证。
- `scripts/verify.mjs`：构建后校验。

## UI 与动画

- 深橄榄色 #222518、米白 #F9F7EA、红色 #D90E19。
- 本地托管的思源黑体衍生子集，字形未修改，子集重命名为 Platform Sans，附 SIL OFL 许可。新增页面文案时需重新生成子集，未覆盖字符使用系统中文字体。
- 按钮按压 120ms；颜色反馈 180ms；首次进入视野的内容淡入 240ms。
- 卡片采用统一分层表面与 Phosphor 功能图标，悬停轻抬 3px；同组卡片以 0/40/80ms 错峰进入，每次页面加载只播放一次。进入效果作用在外层，悬停效果作用在卡片表面，避免变换相互覆盖。
- 键盘发起的操作立即响应；减少动态效果时取消动画；背景不缩放、不视差。
- 内容默认可见，无 JavaScript 仍可阅读，未实现页面入口有页内说明。

图片源于用户确认的生成背景。当前首轮不含发布配置，未公开部署。

## GitHub Pages

Public URL: https://nofilo.github.io/aiflow/

From the aiflow directory run `npm run check`, `npm run build`, `npm run verify`, then `node scripts/export-pages.mjs`. Commit the source and exported files in this directory. The repository .nojekyll allows Astro assets in _astro to be served. Existing sibling sites are preserved. No automatic deletion is performed.
