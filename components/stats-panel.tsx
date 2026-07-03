import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Timer, Clock, TrendingUp, Zap } from "lucide-react";

interface StatsPanelProps {
  sessionsCompleted: number;
  totalFocusMinutes: number;
}

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  accent: string;
}

export function StatsPanel({ sessionsCompleted, totalFocusMinutes }: StatsPanelProps) {
  const stats: StatCard[] = [
    {
      icon: <Timer className="h-4 w-4" />,
      label: "Sessions Today",
      value: sessionsCompleted,
      accent: "from-primary/20 to-accent/20",
    },
    {
      icon: <Clock className="h-4 w-4" />,
      label: "Focus Minutes",
      value: totalFocusMinutes,
      accent: "from-accent/20 to-primary/20",
    },
    {
      icon: <Zap className="h-4 w-4" />,
      label: "Productivity Score",
      value: sessionsCompleted > 0 ? `${Math.min(sessionsCompleted * 20, 100)}%` : "\u2014",
      accent: "from-primary/20 to-accent/20",
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      label: "Streak",
      value: sessionsCompleted > 0 ? "\uD83D\uDD25 Active" : "Start a session",
      accent: "from-accent/20 to-primary/20",
    },
  ];

  return (
    <Card className="p-5">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground/70">
        Today's Stats
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={cn(
              "flex flex-col gap-1.5 rounded-xl border border-border/30 bg-white/[0.02] p-3 transition-all duration-200 hover:bg-white/[0.04]",
            )}
          >
            <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br", stat.accent)}>
              <div className="text-primary">{stat.icon}</div>
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              {stat.value}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground/50">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
