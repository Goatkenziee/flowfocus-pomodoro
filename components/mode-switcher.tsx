"use client";

import { cn } from "@/lib/utils";
import type { TimerMode } from "@/lib/use-pomodoro";
import { Button } from "@/components/ui/button";

const MODES: { key: TimerMode; label: string }[] = [
  { key: "focus", label: "Focus" },
  { key: "break", label: "Short Break" },
  { key: "longBreak", label: "Long Break" },
];

interface ModeSwitcherProps {
  current: TimerMode;
  onSwitch: (mode: TimerMode) => void;
  disabled: boolean;
}

export function ModeSwitcher({ current, onSwitch, disabled }: ModeSwitcherProps) {
  return (
    <div className="flex items-center gap-1.5 rounded-xl bg-muted/50 p-1.5 backdrop-blur-sm">
      {MODES.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onSwitch(key)}
          disabled={disabled}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
            current === key
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
