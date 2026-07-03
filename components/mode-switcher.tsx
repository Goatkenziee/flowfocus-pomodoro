import { cn } from "@/lib/utils";

type Mode = "focus" | "shortBreak" | "longBreak";

interface ModeSwitcherProps {
  current: Mode;
  onSwitch: (mode: Mode) => void;
  disabled?: boolean;
}

const modes: { value: Mode; label: string }[] = [
  { value: "focus", label: "Focus" },
  { value: "shortBreak", label: "Short Break" },
  { value: "longBreak", label: "Long Break" },
];

export function ModeSwitcher({ current, onSwitch, disabled }: ModeSwitcherProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-2xl bg-white/5 p-1 border border-border/30">
      {modes.map((m) => (
        <button
          key={m.value}
          onClick={() => onSwitch(m.value)}
          disabled={disabled}
          className={cn(
            "relative rounded-xl px-4 py-1.5 text-xs font-medium transition-all duration-200",
            current === m.value
              ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-white/5",
            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
