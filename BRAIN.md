# BRAIN.md — FlowFocus Pomodoro Timer

## What this app does
A premium Pomodoro timer for entrepreneurs — 25/5/15 focus sessions with task management, stats tracking, and a modern dark-themed UI.

## Tech stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS 3.4 with custom CSS variables + dark mode
- lucide-react icons, clsx + tailwind-merge for class management
- Deployed via Vercel, code on GitHub

## What's been built
### Timer (core)
- 25-min focus, 5-min short break, 15-min long break (every 4th session)
- Animated circular SVG progress ring with glow effect
- Play / Pause / Reset controls
- Auto-switch between focus and break modes
- Audio notification (Web Audio API beep) on session completion
- Toast notification overlay with message

### Task management
- Add, toggle complete, delete tasks
- Each task tracks pomodoro count
- Tasks persist in memory during session

### Stats dashboard
- Today's focus sessions completed count
- Today's total focus minutes
- Glass-card styled stat display

### Design system
- Dark background with ambient purple gradient glow blobs
- Frosted glass panels (backdrop-blur + subtle borders)
- Purple → accent gradient for primary elements
- SVG ring with gradient stroke + glow filter
- Staggered fade-up animations on load
- Responsive grid: tasks (3 cols) + stats (2 cols) on desktop

## Files (22 total)
- app/globals.css — CSS variables, dark theme, glass effects, animations
- app/layout.tsx — Root layout with Inter font, dark class
- app/page.tsx — Main page: timer, mode switcher, tasks, stats, footer
- components/timer-display.tsx — Circular progress ring + time display
- components/mode-switcher.tsx — Focus / Short Break / Long Break tabs
- components/task-list.tsx — Task input + list with pomodoro counts
- components/stats-panel.tsx — Today's session stats cards
- components/notification-toast.tsx — Slide-in toast notification
- components/ui/button.tsx — Reusable button with primary/ghost/outline variants
- components/ui/card.tsx — Glass card wrapper
- lib/use-pomodoro.ts — All state management: timer, tasks, sessions, notifications
- lib/utils.ts — cn() helper with clsx + tailwind-merge
- tailwind.config.ts — Custom colors, animations (fade-up, float), dark mode
- next.config.mjs, package.json, tsconfig.json, postcss.config.mjs

## Latest changes (this run — "finish make modern design")
- Added ambient background glow blobs (3 blurred circles in primary/accent)
- Added staggered fade-up entrance animations to header, timer, grid, footer
- Added gradient logo icon in header with Timer icon
- Added tagline subtitle
- Added subtle footer
- Fixed hook return aliases (sessionsCompleted, totalFocusMinutes, setMode, notificationMessage)
- Fixed page prop names for ModeSwitcher (current → current, disabled prop)
- Updated tailwind.config with fade-up and float keyframes
- Added cn() utility with clsx + tailwind-merge
- Pushed all updates to GitHub

## Verification
- `npm run build` compiles successfully (Next.js 14, 4 static pages)
- Dev server preview: https://3000-iddgmkh81iwfjf7hkph8e.e2b.app
- GitHub: https://github.com/Goatkenziee/flowfocus-pomodoro
