# FlowFocus — Entrepreneur's Pomodoro Timer

A modern, beautifully designed Pomodoro timer built for entrepreneurs and deep workers. Track focus sessions, manage tasks in-session, and visualize your daily productivity stats.

## Features

- **Pomodoro Timer** — 25 min focus / 5 min short break / 15 min long break with auto-cycling
- **Animated SVG Ring** — Gradient orange progress ring with glow effects
- **Task Management** — Add, complete (check off), and delete tasks during your sessions
- **Daily Stats** — Track total focus minutes, sessions completed, and current streak (persisted to localStorage)
- **Auto-transitions** — Automatically switches from focus → break → focus with notification toasts
- **Dark Glassmorphism UI** — Modern dark theme with orange accent, blur effects, and smooth animations

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (custom dark theme)
- **lucide-react** icons
- **localStorage** for persistence

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
```

Production build passes cleanly.

## Project Structure

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

## Deployment

The app is pushed to GitHub and ready for Vercel deployment.

**GitHub:** [github.com/Goatkenziee/flowfocus-pomodoro](https://github.com/Goatkenziee/flowfocus-pomodoro)

To deploy to Vercel:
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `Goatkenziee/flowfocus-pomodoro` repo
3. Deploy — zero configuration needed (Next.js auto-detected)
