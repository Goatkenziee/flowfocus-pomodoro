"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Plus, Trash2, ListTodo } from "lucide-react";

interface Task {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
}

const TASKS_KEY = "flowfocus-tasks";

function loadTasks(): Task[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(TASKS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveTasks(tasks: Task[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch {}
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    if (mounted) saveTasks(tasks);
  }, [tasks, mounted]);

  const addTask = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, done: false, createdAt: Date.now() },
    ]);
    setInput("");
  }, [input]);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") addTask();
    },
    [addTask]
  );

  if (!mounted) {
    return (
      <Card className="p-4">
        <div className="animate-pulse h-20 bg-white/5 rounded-lg" />
      </Card>
    );
  }

  return (
    <Card className="p-4">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <ListTodo className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Tasks</h3>
        <span className="ml-auto text-xs text-muted-foreground">
          {tasks.filter((t) => t.done).length}/{tasks.length}
        </span>
      </div>

      {/* Input */}
      <div className="mb-3 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a task..."
          className="flex-1 rounded-xl border border-border/50 bg-white/5 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:border-primary/50 focus:bg-white/10"
        />
        <button
          onClick={addTask}
          disabled={!input.trim()}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent text-white shadow-sm transition-all duration-200 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Task list */}
      <div className="space-y-1 max-h-[200px] overflow-y-auto scrollbar-hide">
        {tasks.length === 0 ? (
          <p className="py-3 text-center text-xs text-muted-foreground">
            No tasks yet. Add one above to get started.
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="group flex items-center gap-2 rounded-xl px-2 py-2 transition-all duration-200 hover:bg-white/5"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
              >
                {task.done ? (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </button>
              <span
                className={cn(
                  "flex-1 text-sm transition-all duration-200",
                  task.done
                    ? "text-muted-foreground/50 line-through"
                    : "text-foreground"
                )}
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 transition-all duration-200"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
