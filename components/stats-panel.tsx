"use client";

import { Card } from "@/components/ui/card";
import { Timer, Target, TrendingUp, Clock } from "lucide-react";

interface StatsPanelProps {
  todayFocusSessions: number;
  todayFocusMinutes: number;
  totalFocusSessions: number;
  tasksCompleted: number;
}

export function StatsPanel({
  todayFocusSessions,
  todayFocusMinutes,
  totalFocusSessions,
  tasksCompleted,
}: StatsPanelProps) {
  const stats = [
    {
      icon: Timer,
      label: "Today's Sessions",
      value: todayFocusSessions,
      suffix: "sessions",
      gradient: "from-primary to-accent",
    },
    {
      icon: Clock,
      label: "Focus Time Today",
      value: todayFocusMinutes,
      suffix: "min",
      gradient: "from-emerald-400 to-teal-300",
    },
    {
      icon: TrendingUp,
      label: "Total Sessions",
      value: totalFocusSessions,
      suffix: "sessions",
      gradient: "from-sky-400 to-blue-300",
    },
    {
      icon: Target,
      label: "Tasks Done",
      value: tasksCompleted,
      suffix: "tasks",
      gradient: "from-amber-400 to-orange-300",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4 hover:border-primary/30 transition-all duration-200">
          <div className="flex items-start justify-between mb-3">
            <div className={`inline-flex rounded-lg bg-gradient-to-br ${stat.gradient} p-2 text-white`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold tabular-nums tracking-tight">
              {stat.value}
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                {stat.suffix}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
