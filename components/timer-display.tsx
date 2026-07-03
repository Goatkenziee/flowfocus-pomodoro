"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  RotateCcw,
  Timer,
  Coffee,
  Moon,
} from "lucide-react";

type Mode = "focus" | "shortBreak" | "longBreak";

interface TimerDisplayProps {
  timeLeft: number;
  totalDuration: number;
  mode: Mode;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

const modeIcons: Record<Mode, React.ReactNode> = {
  focus: <Timer className="h-4 w-4" />,
  shortBreak: <Coffee className="h-4 w-4" />,
  longBreak: <Moon className="h-4 w-4" />,
};

const modeLabels: Record<Mode, string> = {
  focus: "Focus Time",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

export function TimerDisplay({
  timeLeft,
  totalDuration,
  mode,
  isRunning,
  onStart,
  onPause,
  onReset,
}: TimerDisplayProps) {
  const progress = 1 - timeLeft / totalDuration;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative flex flex-col items-center">
      {/* SVG Ring */}
      <svg
        width="280"
        height="280"
        viewBox="0 0 280 280"
        className="glow-filter"
      >
        {/* Background ring */}
        <circle
          cx="140"
          cy="140"
          r="120"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="6"
        />
        {/* Progress ring */}
        <circle
          cx="140"
          cy="140"
          r="120"
          fill="none"
          stroke="url(#orangeGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 140 140)"
          className="transition-all duration-1000 ease-linear"
        />
        {/* Gradient def */}
        <defs>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Mode label */}
        <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          {modeIcons[mode]}
          <span>{modeLabels[mode]}</span>
        </div>

        {/* Time */}
        <div className="text-6xl font-bold tracking-tight text-foreground tabular-nums">
          {formatTime(timeLeft)}
        </div>

        {/* Controls */}
        <div className="mt-4 flex items-center gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={isRunning ? onPause : onStart}
            className="min-w-[120px]"
          >
            {isRunning ? (
              <>
                <Pause className="h-4 w-4" /> Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" /> Start
              </>
            )}
          </Button>
          <Button variant="ghost" size="md" onClick={onReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
