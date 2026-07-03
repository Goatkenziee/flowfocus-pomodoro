"use client";

import { cn } from "@/lib/utils";
import type { TimerMode } from "@/lib/use-pomodoro";

interface TimerDisplayProps {
  timeLeft: number;
  progress: number;
  mode: TimerMode;
  isRunning: boolean;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

const MODE_COLORS: Record<TimerMode, string> = {
  focus: "stroke-primary",
  break: "stroke-emerald-400",
  longBreak: "stroke-sky-400",
};

const MODE_GRADIENTS: Record<TimerMode, string> = {
  focus: "from-primary to-accent",
  break: "from-emerald-400 to-teal-300",
  longBreak: "from-sky-400 to-blue-300",
};

export function TimerDisplay({ timeLeft, progress, mode, isRunning }: TimerDisplayProps) {
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);
  const colorClass = MODE_COLORS[mode];
  const gradientClass = MODE_GRADIENTS[mode];

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow behind ring */}
      <div
        className={cn(
          "absolute rounded-full blur-3xl opacity-30 transition-all duration-700",
          mode === "focus" ? "bg-primary/40" : mode === "break" ? "bg-emerald-400/30" : "bg-sky-400/30",
          isRunning ? "scale-110" : "scale-100",
        )}
        style={{ width: 360, height: 360 }}
      />

      {/* SVG Ring */}
      <svg
        width={340}
        height={340}
        className="relative -rotate-90 drop-shadow-xl"
        viewBox="0 0 340 340"
      >
        {/* Background ring */}
        <circle
          cx="170"
          cy="170"
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="6"
          className="opacity-30"
        />
        {/* Progress ring */}
        <circle
          cx="170"
          cy="170"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(colorClass, "transition-all duration-1000 ease-linear")}
          style={{
            filter: "drop-shadow(0 0 12px currentColor)",
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute flex flex-col items-center">
        <span
          className={cn(
            "text-7xl font-bold tabular-nums tracking-tight transition-colors",
            isRunning && "text-foreground",
          )}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {formatTime(timeLeft)}
        </span>
        <span
          className={cn(
            "mt-2 text-sm font-medium uppercase tracking-[0.2em] bg-gradient-to-r bg-clip-text text-transparent",
            gradientClass,
          )}
        >
          {mode === "focus" ? "Focus" : mode === "break" ? "Break" : "Long Break"}
        </span>
      </div>
    </div>
  );
}
