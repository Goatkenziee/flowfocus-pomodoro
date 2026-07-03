"use client";

import { useState, useCallback, useRef, useEffect } from "react";

type Mode = "focus" | "shortBreak" | "longBreak";

interface DailyStats {
  totalFocusMinutes: number;
  sessionsCompleted: number;
  currentStreak: number;
}

interface PomodoroState {
  timeLeft: number;
  totalDuration: number;
  mode: Mode;
  isRunning: boolean;
  sessionsCompleted: number;
  dailyStats: DailyStats;
  notification: string | null;
}

const MODE_DURATIONS: Record<Mode, number> = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const LONG_BREAK_INTERVAL = 4;

const STORAGE_KEY = "flowfocus-stats";

function loadStats(): DailyStats {
  if (typeof window === "undefined") {
    return { totalFocusMinutes: 0, sessionsCompleted: 0, currentStreak: 0 };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Check if it's today's data
      const today = new Date().toDateString();
      if (parsed.date === today) {
        return parsed.stats;
      }
    }
  } catch {}
  return { totalFocusMinutes: 0, sessionsCompleted: 0, currentStreak: 0 };
}

function saveStats(stats: DailyStats) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ date: new Date().toDateString(), stats })
    );
  } catch {}
}

export function usePomodoro() {
  const [state, setState] = useState<PomodoroState>(() => ({
    timeLeft: MODE_DURATIONS.focus,
    totalDuration: MODE_DURATIONS.focus,
    mode: "focus",
    isRunning: false,
    sessionsCompleted: 0,
    dailyStats: loadStats(),
    notification: null,
  }));

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const focusSessionsRef = useRef(0);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const switchMode = useCallback(
    (newMode: Mode) => {
      clearTimer();
      setState((prev) => ({
        ...prev,
        mode: newMode,
        timeLeft: MODE_DURATIONS[newMode],
        totalDuration: MODE_DURATIONS[newMode],
        isRunning: false,
        notification: null,
      }));
    },
    [clearTimer]
  );

  const start = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: true, notification: null }));
  }, []);

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    setState((prev) => ({
      ...prev,
      timeLeft: MODE_DURATIONS[prev.mode],
      totalDuration: MODE_DURATIONS[prev.mode],
      isRunning: false,
      notification: null,
    }));
  }, [clearTimer]);

  const dismissNotification = useCallback(() => {
    setState((prev) => ({ ...prev, notification: null }));
  }, []);

  // Timer tick
  useEffect(() => {
    if (!state.isRunning) {
      clearTimer();
      return;
    }

    intervalRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.timeLeft <= 1) {
          clearTimer();

          if (prev.mode === "focus") {
            focusSessionsRef.current += 1;
            const newSessions = prev.sessionsCompleted + 1;
            const updatedStats: DailyStats = {
              totalFocusMinutes:
                prev.dailyStats.totalFocusMinutes +
                Math.round(MODE_DURATIONS.focus / 60),
              sessionsCompleted: newSessions,
              currentStreak: prev.dailyStats.currentStreak + 1,
            };
            saveStats(updatedStats);

            // Auto-switch to break
            const nextMode: Mode =
              focusSessionsRef.current % LONG_BREAK_INTERVAL === 0
                ? "longBreak"
                : "shortBreak";

            return {
              ...prev,
              timeLeft: MODE_DURATIONS[nextMode],
              totalDuration: MODE_DURATIONS[nextMode],
              mode: nextMode,
              isRunning: false,
              sessionsCompleted: newSessions,
              dailyStats: updatedStats,
              notification: "Focus session complete! Time for a break.",
            };
          } else {
            // Break finished — auto-switch back to focus
            return {
              ...prev,
              timeLeft: MODE_DURATIONS.focus,
              totalDuration: MODE_DURATIONS.focus,
              mode: "focus",
              isRunning: false,
              notification: "Break is over! Ready to focus again?",
            };
          }
        }

        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return clearTimer;
  }, [state.isRunning, state.mode, clearTimer]);

  return {
    timeLeft: state.timeLeft,
    totalDuration: state.totalDuration,
    mode: state.mode,
    isRunning: state.isRunning,
    sessionsCompleted: state.sessionsCompleted,
    dailyStats: state.dailyStats,
    notification: state.notification,
    switchMode,
    start,
    pause,
    reset,
    dismissNotification,
  };
}
