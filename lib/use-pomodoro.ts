"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export type TimerMode = "focus" | "break" | "longBreak";

export const TIMER_CONFIG = {
  focus: 25 * 60,
  break: 5 * 60,
  longBreak: 15 * 60,
} as const;

export const MODE_LABELS: Record<TimerMode, string> = {
  focus: "Focus",
  break: "Short Break",
  longBreak: "Long Break",
};

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  pomodoros: number;
  createdAt: number;
}

export interface Session {
  id: string;
  mode: TimerMode;
  duration: number;
  completedAt: number;
  taskId?: string;
}

/** Generate a unique ID — works in all Next.js environments */
function uid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function usePomodoro() {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(TIMER_CONFIG.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const focusCountRef = useRef(0);

  const totalTime = TIMER_CONFIG[mode];
  const progress = 1 - timeLeft / totalTime;

  const playNotification = useCallback(() => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(660, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      /* Audio not available */
    }
  }, []);

  const switchMode = useCallback((newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(TIMER_CONFIG[newMode]);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(TIMER_CONFIG[mode]);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [mode]);

  const completeSession = useCallback(() => {
    const effectiveDuration = TIMER_CONFIG[mode] - timeLeft;

    const session: Session = {
      id: uid(),
      mode,
      duration: effectiveDuration,
      completedAt: Date.now(),
      taskId: currentTaskId ?? undefined,
    };

    setSessions((prev) => [session, ...prev]);

    if (currentTaskId) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === currentTaskId ? { ...t, pomodoros: t.pomodoros + 1 } : t,
        ),
      );
    }

    // Track focus count via ref to avoid stale closure
    if (mode === "focus") {
      focusCountRef.current += 1;
    }

    playNotification();

    // Auto-switch after a brief delay so the user sees the notification
    setTimeout(() => {
      if (mode === "focus") {
        switchMode(focusCountRef.current % 4 === 0 ? "longBreak" : "break");
      } else {
        switchMode("focus");
      }
    }, 500);
  }, [mode, timeLeft, currentTaskId, playNotification, switchMode]);

  // Timer tick
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  // When timer hits 0, complete the session
  const justCompletedRef = useRef(false);

  useEffect(() => {
    if (timeLeft === 0 && !isRunning && !justCompletedRef.current) {
      justCompletedRef.current = true;
      completeSession();
    }
    if (timeLeft > 0) {
      justCompletedRef.current = false;
    }
  }, [timeLeft, isRunning, completeSession]);

  // Task management
  const addTask = useCallback((text: string) => {
    const task: Task = {
      id: uid(),
      text,
      completed: false,
      pomodoros: 0,
      createdAt: Date.now(),
    };
    setTasks((prev) => [task, ...prev]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const selectTask = useCallback((id: string | null) => {
    setCurrentTaskId(id);
  }, []);

  // Stats
  const todaySessions = sessions.filter(
    (s) => new Date(s.completedAt).toDateString() === new Date().toDateString(),
  );
  const todayFocusSessions = todaySessions.filter((s) => s.mode === "focus");
  const todayFocusMinutes = Math.round(
    todayFocusSessions.reduce((acc, s) => acc + s.duration, 0) / 60,
  );
  const totalFocusSessions = sessions.filter((s) => s.mode === "focus").length;

  return {
    mode,
    timeLeft,
    isRunning,
    progress,
    tasks,
    currentTaskId,
    sessions,
    todayFocusSessions: todayFocusSessions.length,
    todayFocusMinutes,
    totalFocusSessions,
    showNotification,
    start,
    pause,
    reset,
    switchMode,
    addTask,
    toggleTask,
    deleteTask,
    selectTask,
    setCurrentTaskId,
  };
}
