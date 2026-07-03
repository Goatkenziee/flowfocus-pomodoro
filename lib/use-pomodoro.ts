"use client";

import { useState, useCallback, useRef, useEffect } from "react";

type Mode = "focus" | "shortBreak" | "longBreak";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  pomodoros: number;
}

interface Session {
  id: string;
  mode: Mode;
  duration: number;
  completedAt: Date;
}

const MODE_DURATIONS: Record<Mode, number> = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const LONG_BREAK_INTERVAL = 4;

let taskIdCounter = 0;
let sessionIdCounter = 0;

function generateTaskId(): string {
  taskIdCounter++;
  return `task_${Date.now()}_${taskIdCounter}`;
}

function generateSessionId(): string {
  sessionIdCounter++;
  return `session_${Date.now()}_${sessionIdCounter}`;
}

export function usePomodoro() {
  const [mode, setModeState] = useState<Mode>("focus");
  const [timeLeft, setTimeLeft] = useState(MODE_DURATIONS["focus"]);
  const [isRunning, setIsRunning] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const focusCountRef = useRef(0);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const playNotification = useCallback(() => {
    try {
      const ctx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } catch {
      // Audio not available
    }
  }, []);

  const showToast = useCallback((message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  }, []);

  const switchMode = useCallback(
    (newMode: Mode) => {
      clearTimer();
      setIsRunning(false);
      setModeState(newMode);
      setTimeLeft(MODE_DURATIONS[newMode]);
    },
    [clearTimer],
  );

  const completeSession = useCallback(() => {
    const newSession: Session = {
      id: generateSessionId(),
      mode,
      duration: MODE_DURATIONS[mode] - timeLeft,
      completedAt: new Date(),
    };
    setSessions((prev) => [...prev, newSession]);

    // Update current task pomodoro count
    if (currentTaskId && mode === "focus") {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === currentTaskId ? { ...t, pomodoros: t.pomodoros + 1 } : t,
        ),
      );
    }

    playNotification();

    if (mode === "focus") {
      focusCountRef.current += 1;
      showToast("✅ Focus session complete! Great work.");

      if (focusCountRef.current % LONG_BREAK_INTERVAL === 0) {
        switchMode("longBreak");
      } else {
        switchMode("shortBreak");
      }
    } else {
      showToast("☕ Break's over — time to focus!");
      switchMode("focus");
    }
  }, [mode, timeLeft, currentTaskId, playNotification, showToast, switchMode]);

  const start = useCallback(() => {
    if (timeLeft <= 0) return;
    setIsRunning(true);
  }, [timeLeft]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setTimeLeft(MODE_DURATIONS[mode]);
  }, [clearTimer, mode]);

  // Timer tick
  useEffect(() => {
    if (!isRunning) {
      clearTimer();
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          setIsRunning(false);
          // Complete session in next tick to avoid state conflicts
          setTimeout(() => completeSession(), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimer();
  }, [isRunning, clearTimer, completeSession]);

  // Progress
  const progress = 1 - timeLeft / MODE_DURATIONS[mode];

  // Task actions
  const addTask = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTask: Task = {
      id: generateTaskId(),
      text: trimmed,
      completed: false,
      pomodoros: 0,
    };
    setTasks((prev) => [...prev, newTask]);
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
    showNotification,
    notificationMessage,
    // Aliases the page expects
    sessionsCompleted: todayFocusSessions.length,
    totalFocusMinutes: todayFocusMinutes,
    setMode: switchMode,
    // Actions
    start,
    pause,
    reset,
    addTask,
    toggleTask,
    deleteTask,
    selectTask,
  };
}
