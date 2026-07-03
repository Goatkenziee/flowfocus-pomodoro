"use client";

import { usePomodoro, MODE_LABELS } from "@/lib/use-pomodoro";
import { TimerDisplay } from "@/components/timer-display";
import { ModeSwitcher } from "@/components/mode-switcher";
import { TaskList } from "@/components/task-list";
import { StatsPanel } from "@/components/stats-panel";
import { NotificationToast } from "@/components/notification-toast";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Sparkles } from "lucide-react";

export default function Home() {
  const pom = usePomodoro();

  const notificationMessage =
    pom.mode === "focus"
      ? "🎉 Focus session complete!"
      : "☕ Break's over — time to focus!";

  // Count completed tasks
  const tasksCompleted = pom.tasks.filter((t) => t.completed).length;

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <NotificationToast show={pom.showNotification} message={notificationMessage} />

      {/* Header */}
      <header className="relative z-10 border-b border-border/40 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-lg font-bold gradient-text">FlowFocus</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Entrepreneur&apos;s Pomodoro
          </p>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left column — Timer */}
          <div className="flex flex-col items-center gap-8 pt-4">
            <ModeSwitcher
              current={pom.mode}
              onSwitch={pom.switchMode}
              disabled={pom.isRunning}
            />

            <TimerDisplay
              timeLeft={pom.timeLeft}
              progress={pom.progress}
              mode={pom.mode}
              isRunning={pom.isRunning}
            />

            {/* Controls */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={pom.reset}
              >
                <RotateCcw className="h-5 w-5" />
              </Button>

              <Button
                variant={pom.isRunning ? "outline" : "default"}
                size="icon"
                className="h-16 w-16 rounded-full shadow-xl shadow-primary/20"
                onClick={pom.isRunning ? pom.pause : pom.start}
              >
                {pom.isRunning ? (
                  <Pause className="h-7 w-7" />
                ) : (
                  <Play className="h-7 w-7 ml-0.5" />
                )}
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={() => pom.switchMode(pom.mode === "focus" ? "break" : "focus")}
              >
                <span className="text-lg">⏭</span>
              </Button>
            </div>

            {/* Active task indicator */}
            {pom.currentTaskId && (
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">CURRENT TASK</p>
                <p className="text-sm font-medium text-primary">
                  {pom.tasks.find((t) => t.id === pom.currentTaskId)?.text}
                </p>
              </div>
            )}
          </div>

          {/* Right column — Tasks + Stats */}
          <div className="flex flex-col gap-6">
            <StatsPanel
              todayFocusSessions={pom.todayFocusSessions}
              todayFocusMinutes={pom.todayFocusMinutes}
              totalFocusSessions={pom.totalFocusSessions}
              tasksCompleted={tasksCompleted}
            />

            <TaskList
              tasks={pom.tasks}
              currentTaskId={pom.currentTaskId}
              onAdd={pom.addTask}
              onToggle={pom.toggleTask}
              onDelete={pom.deleteTask}
              onSelect={pom.selectTask}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
