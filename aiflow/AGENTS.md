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
