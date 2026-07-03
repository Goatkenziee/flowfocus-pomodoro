# BRAIN.md

## What this app does
FlowFocus — an entrepreneur's modern Pomodoro timer with task management and daily stats tracking.

## Tech stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS (dark glassmorphism theme)
- lucide-react icons
- localStorage for persistence (tasks + daily stats)

## What has been built
- ✅ Full Pomodoro timer (25 min focus / 5 min short break / 15 min long break)
- ✅ Auto-cycling between focus and break sessions
- ✅ Animated SVG progress ring (orange gradient glow)
- ✅ Mode switcher (Focus / Short Break / Long Break)
- ✅ Task list with add/toggle/delete + localStorage persistence
- ✅ Daily stats panel (focus minutes, sessions, streak)
- ✅ Notification toast on session transitions
- ✅ Dark glassmorphism design with orange/white color scheme
- ✅ Fixed empty `pages/` directory build error
- ✅ Production build passes cleanly
- ✅ GitHub repo populated: https://github.com/Goatkenziee/flowfocus-pomodoro

## What's still pending
- ⏳ Vercel deploy — blocked by expired Vercel integration (401). User needs to reconnect at Settings → Integrations → Vercel, then I can deploy.
- ⏳ Future enhancements: sound notifications, custom durations, PWA support, data export

## User preferences
- Modern, dark, glassmorphism aesthetic
- Orange accent (#f97316) on dark background
- Clean, production-ready code

## Project structure
```
flowfocus-pomodoro/
├── app/
│   ├── globals.css        # Tailwind + CSS variables (orange theme)
│   ├── layout.tsx         # Root layout with Inter font
│   └── page.tsx           # Main page (client component)
├── components/
│   ├── mode-switcher.tsx   # Focus / Short Break / Long Break tabs
│   ├── notification-toast.tsx  # Slide-up notification on session change
│   ├── stats-panel.tsx     # Daily stats badges (minutes, sessions, streak)
│   ├── task-list.tsx       # Add/toggle/delete tasks with localStorage
│   ├── timer-display.tsx   # Animated SVG ring + time + start/pause/reset
│   └── ui/
│       ├── button.tsx      # Reusable button (primary/ghost/outline)
│       └── card.tsx        # Glass card wrapper
├── lib/
│   ├── use-pomodoro.ts     # Core hook: timer logic, auto-cycle, stats
│   └── utils.ts            # cn() helper (clsx + tailwind-merge)
└── package.json
```

## Run notes
- Last updated: 2026-07-03T16:40:00.000Z
- Run count: 2
