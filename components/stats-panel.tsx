"use client";

import { cn } from "@/lib/utils";
import { Timer, Flame, Zap } from "lucide-react";

interface DailyStats {
  totalFocusMinutes: number;
  sessionsCompleted: number;
  currentStreak: number;
}

interface StatsPanelProps {
  stats: DailyStats;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="flex items-center gap-3">
      <StatItem
        icon={<Timer className="h-3.5 w-3.5" />}
        value={`${stats.totalFocusMinutes}m`}
        label="Today"
      />
      <StatItem
        icon={<Zap className="h-3.5 w-3.5" />}
        value={`${stats.sessionsCompleted}`}
        label="Sessions"
      />
      <StatItem
        icon={<Flame className="h-3.5 w-3.5" />}
        value={`${stats.currentStreak}`}
        label="Streak"
      />
    </div>
  );
}

function StatItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-xl bg-white/5 px-3 py-1.5">
      <span className="text-primary">{icon}</span>
      <span className="text-xs font-semibold text-foreground tabular-nums">
        {value}
      </span>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}
