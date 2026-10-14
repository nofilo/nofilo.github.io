# Website conventions

- Stack: Astro, TypeScript, Tailwind CSS. Add React only when an approved interaction warrants it.
- Current scope: shared components, homepage, workspace and step 3 personal pages. Admin and system pages require confirmation.
- Target: desktop web only. No mobile-specific navigation, page layouts, assets or acceptance tests in the active implementation. Verify desktop widths from 1024px upward.
- src/components/: shared Astro primitives and layout components; src/components/home/: homepage sections.
- src/layouts/: page shells; src/styles/: tokens and global CSS; src/data/: typed public content; src/pages/: approved routes only; src/scripts/: progressive enhancements.
- public/assets/: optimized approved images and locally hosted fonts with licenses. scripts/: local build verification.
- node_modules/, dist/ and .astro/ are generated locally; exclude them from source archives. No automatic cleanup.
- Use descriptive English filenames. Retain original design files outside this directory. Public outputs must exclude private Feishu links and credentials.
- Unbuilt page links should expose a clearly labelled in-page preview notice; no fake success or backend behavior. Preserve intended destinations in data for subsequent iterations.
- Animate only purposeful state changes. Pointer hover is gated; keyboard interaction is immediate; reduced motion disables movement. Content must be usable without JavaScript.
- Verify with npm run check, npm run build, npm run verify. Browser visual/interaction verification is separate and must be reported accurately.
- No CI/CD changes, public deployment, git push, deletions, secrets changes, global installs or database changes without explicit approval.
## Visual consistency
- All panels and cards use shared theme surface tokens derived from #222518. No per-card hardcoded background colors or nth-child palette overrides.
- #D90E19 is reserved for primary actions and active accents; #E9A23B is for pending/incomplete statuses.
- Neutral text and border tokens remain gray. Shared cards use the same normal, hover and focus rules across homepage and workspace.
- Motion enhancement: headline line reveals, grouped one-time section entrances, pointer spotlight and subtle hero parallax. Shared header gains a scrolled surface. All disable movement for reduced motion and keyboard use; preserve native scrolling and readable no-JavaScript content.

- Knowledge migration approved: /workspace/knowledge/ contains search, qa and training. Retain legacy onboarding routes as compatibility redirects. Use uploaded aiflow source as visual baseline; retain its editorial homepage and add lightweight ordered business links. Knowledge search and AI answers remain unconnected until real services and materials are supplied.
- public/downloads/: user-supplied downloadable tool archives, descriptive ASCII filenames; preserve original archives and do not execute bundled programs. Platform tags are separate from application form and availability status.
- Approved local UI refinement: workspace uses search-led compact catalog cards; personal overview uses real local favorite/recent lists and a request/draft rail. Apply only to this conversation site, not the Desktop repository; no GitHub operations during this iteration.
- Status badge update approved: green means a confirmed entry/download, amber means pending/configuration/contact required, red means maintenance/offline/error. Keep text labels; never invent error states. Catalog status pills sit at the upper left. These semantic colors are exceptions to the brand accent rule.
- Catalog image cards approved: use 16:9 locally hosted editorial covers above app information; label conceptual imagery 功能示意. Store versioned covers directly in public/assets/. Preserve actual statuses, links and favorites. No GitHub operations.

- Approved catalog expansion: knowledge becomes 知识百宝箱 with materials, media, training, assistant and library entries. Preserve old knowledge routes as redirects. Business catalog expands to 20 apps; retain existing IDs and shared preview entry. Unknown resource links remain disabled. New covers follow the approved bright technology style; preserve originals in outputs/.

- Approved ByteDance entries: platform-order-entry belongs to short-video/campaign-setup; fulfillment-assistant belongs to short-video/launch-review. Both are external platform tools with document-only access and 接入待定 status. Do not imply runnable integration or verified document contents. Generate bright matching covers; local changes only.

- Catalog normalization: statuses are only 待开发 / 待上线 / 已上线; acquisition conditions remain separate notes. 字节平台 is labeled 巨量平台. Knowledge entries are included in all-app search/filter/favorites with their existing knowledge routes; only video businesses generate execution scene routes.

- Approved local layout trial: video businesses use left scene navigation and shared searchable image-card lists, like knowledge. Knowledge has no scene layer. Use business-specific scene names and icons without changing URLs. Filters expand inline with removable selected chips and visible counts. Publish only after user review.

- Approved refinement: shared directory owns a permanent left rail for scene/view navigation and filters. Knowledge views (all/favorites/recent) do not add business hierarchy. Search remains on the right; preserve URL filter state and local storage behavior.

## Approved GitHub Pages delivery
- Site is hosted under /aiflow/. Preserve other repository sites.
- Deployment source uses /aiflow/ links and the existing Astro base configuration.
- scripts/export-pages.mjs copies validated dist output beside src for branch-based Pages publishing.
- No automatic cleanup or deletions. Rebuild and verify before exporting and pushing.
