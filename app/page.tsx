"use client";
import { useState, useEffect } from "react";
import { TimerDisplay } from "@/components/timer-display";
import { ModeSwitcher } from "@/components/mode-switcher";
import { TaskList } from "@/components/task-list";
import { StatsPanel } from "@/components/stats-panel";
import { NotificationToast } from "@/components/notification-toast";
import { usePomodoro } from "@/lib/use-pomodoro";

type Mode = "focus" | "shortBreak" | "longBreak";

export default function Home() {
  const {
    timeLeft,
    totalDuration,
    mode,
    isRunning,
    sessionsCompleted,
    dailyStats,
    notification,
    switchMode,
    start,
    pause,
    reset,
    dismissNotification,
  } = usePomodoro();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-primary text-lg font-medium">
          Loading FlowFocus...
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-40 right-[-10%] h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            FlowFocus
          </span>
        </div>
        <StatsPanel stats={dailyStats} />
      </header>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-lg px-4 pt-8 sm:pt-12">
        {/* Mode selector */}
        <div className="mb-8 flex justify-center">
          <ModeSwitcher current={mode} onSwitch={switchMode} disabled={isRunning} />
        </div>

        {/* Timer */}
        <div className="mb-8 flex justify-center">
          <TimerDisplay
            timeLeft={timeLeft}
            totalDuration={totalDuration}
            mode={mode}
            isRunning={isRunning}
            onStart={start}
            onPause={pause}
            onReset={reset}
          />
        </div>

        {/* Task list */}
        <div className="mb-8">
          <TaskList />
        </div>

        {/* Footer */}
        <footer className="pb-8 text-center">
          <p className="text-xs text-muted-foreground">
            Focus on what matters. One session at a time.
          </p>
        </footer>
      </div>

      {/* Notification toast */}
      {notification && (
        <NotificationToast
          message={notification}
          onDismiss={dismissNotification}
        />
      )}
    </main>
  );
}
