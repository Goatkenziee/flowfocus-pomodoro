"use client";

import { usePomodoro } from "@/lib/use-pomodoro";
import { TimerDisplay } from "@/components/timer-display";
import { ModeSwitcher } from "@/components/mode-switcher";
import { TaskList } from "@/components/task-list";
import { StatsPanel } from "@/components/stats-panel";
import { NotificationToast } from "@/components/notification-toast";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Sparkles } from "lucide-react";

export default function Home() {
  const {
    mode,
    timeLeft,
    isRunning,
    progress,
    tasks,
    showNotification,
    notificationMessage,
    sessionsCompleted,
    totalFocusMinutes,
    setMode,
    start,
    pause,
    reset,
    addTask,
    toggleTask,
    deleteTask,
  } = usePomodoro();

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background gradient blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      {/* Toast notification */}
      <NotificationToast show={showNotification} message={notificationMessage} />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10 text-center animate-fade-up">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              FlowFocus
            </h1>
          </div>
          <p className="text-xs text-muted-foreground/50">
            Entrepreneur's Pomodoro Timer
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* Left: Timer section */}
          <div className="flex flex-col items-center gap-8">
            {/* Mode switcher */}
            <ModeSwitcher current={mode} onSwitch={setMode} disabled={isRunning} />

            {/* Timer */}
            <TimerDisplay
              timeLeft={timeLeft}
              progress={progress}
              isRunning={isRunning}
              mode={mode}
            />

            {/* Controls */}
            <div className="flex items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={isRunning ? pause : start}
                className="min-w-[140px] gap-2"
              >
                {isRunning ? (
                  <>
                    <Pause className="h-4 w-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" /> Start Focus
                  </>
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right: Stats & Tasks */}
          <div className="flex flex-col gap-4">
            <StatsPanel
              sessionsCompleted={sessionsCompleted}
              totalFocusMinutes={totalFocusMinutes}
            />
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
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-[10px] text-muted-foreground/30">
          FlowFocus \u2014 Focus on what matters
        </footer>
      </div>
    </main>
  );
}
