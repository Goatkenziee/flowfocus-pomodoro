import { cn } from "@/lib/utils";

type Mode = "focus" | "shortBreak" | "longBreak";

interface TimerDisplayProps {
  timeLeft: number;
  progress: number;
  isRunning: boolean;
  mode: Mode;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

const modeColors: Record<Mode, { stroke: string; glow: string }> = {
  focus: { stroke: "url(#focusGradient)", glow: "rgba(249,115,22,0.4)" },
  shortBreak: { stroke: "url(#breakGradient)", glow: "rgba(251,146,60,0.4)" },
  longBreak: { stroke: "url(#breakGradient)", glow: "rgba(251,146,60,0.4)" },
};

const modeLabels: Record<Mode, string> = {
  focus: "Focus Time",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

export function TimerDisplay({ timeLeft, progress, isRunning, mode }: TimerDisplayProps) {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);
  const colors = modeColors[mode];

  return (
    <div className="relative flex items-center justify-center">
      {/* SVG Ring */}
      <svg
        width={280}
        height={280}
        viewBox="0 0 280 280"
        className={cn("glow-filter", isRunning && "animate-float")}
      >
        <defs>
          <linearGradient id="focusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
          <linearGradient id="breakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#fdba74" />
          </linearGradient>
        </defs>

        {/* Track */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="6"
        />

        {/* Progress */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          fill="none"
          stroke={colors.stroke}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 140 140)"
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>

      {/* Center Content */}
      <div className="absolute flex flex-col items-center">
        <span className="text-[56px] font-bold tracking-tight tabular-nums text-foreground">
          {formatTime(timeLeft)}
        </span>
        <span className="mt-1 text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
          {modeLabels[mode]}
        </span>
      </div>
    </div>
  );
}
