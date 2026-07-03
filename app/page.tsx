"use client";

import { usePomodoro } from "@/lib/use-pomodoro";
import { TimerDisplay } from "@/components/timer-display";
import { ModeSwitcher } from "@/components/mode-switcher";
import { TaskList } from "@/components/task-list";
import { StatsPanel } from "@/components/stats-panel";
import { NotificationToast } from "@/components/notification-toast";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";

export default function Page() {
  const {
    mode,
    timeLeft,
    isRunning,
    progress,
    tasks,
    sessionsCompleted,
    totalFocusMinutes,
    showNotification,
    notificationMessage,
    start,
    pause,
    reset,
    setMode,
    addTask,
    toggleTask,
    deleteTask,
  } = usePomodoro();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* ── Ambient background effects ── */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      <NotificationToast show={showNotification} message={notificationMessage} />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* ── Header ── */}
        <header className="mb-10 text-center animate-fade-up">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
              <Timer className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight">
              Flow<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Focus</span>
            </h1>
          </div>
          <p className="text-xs text-muted-foreground/70 max-w-md mx-auto">
            A premium Pomodoro timer for entrepreneurs who build empires one session at a time.
          </p>
        </header>

        {/* ── Timer Section ── */}
        <section className="mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex flex-col items-center">
            <ModeSwitcher current={mode} onSwitch={setMode} disabled={isRunning} />

            <div className="mt-6">
              <TimerDisplay
                timeLeft={timeLeft}
                progress={progress}
                isRunning={isRunning}
                mode={mode}
              />
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={isRunning ? pause : start}
                className="gap-2 min-w-[140px]"
              >
                {isRunning ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    {timeLeft < 1500 ? "Resume" : "Start"}
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={reset}
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* ── Bottom Grid: Tasks + Stats ── */}
        <div
          className="grid grid-cols-1 gap-6 lg:grid-cols-5 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          {/* Tasks — takes 3 cols on lg */}
          <div className="lg:col-span-3">
            <TaskList
              tasks={tasks.map((t) => ({
                id: t.id,
                text: t.text,
                done: t.completed,
                pomodoros: t.pomodoros,
              }))}
              onAdd={addTask}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          </div>

          {/* Stats — takes 2 cols on lg */}
          <div className="lg:col-span-2">
            <StatsPanel
              sessionsCompleted={sessionsCompleted}
              totalFocusMinutes={totalFocusMinutes}
            />
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="mt-12 text-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/30">
            Made for the determined · FlowFocus
          </p>
        </footer>
      </div>
    </div>
  );
}
