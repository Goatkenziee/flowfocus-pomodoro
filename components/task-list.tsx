"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Check, Trash2, Target } from "lucide-react";

interface Task {
  id: string;
  text: string;
  done: boolean;
  pomodoros: number;
}

interface TaskListProps {
  tasks: Task[];
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onAdd, onToggle, onDelete }: TaskListProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input.trim());
      setInput("");
    }
  };

  return (
    <Card className="p-5">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground/70">
        Tasks
      </h2>

      {/* Add task */}
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task…"
          className="flex-1 rounded-xl border border-border bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
        />
        <Button type="submit" size="icon" disabled={!input.trim()}>
          <Plus className="h-4 w-4" />
        </Button>
      </form>

      {/* Task list */}
      <div className="space-y-2 max-h-[280px] overflow-y-auto scrollbar-hide pr-1">
        {tasks.length === 0 && (
          <p className="py-6 text-center text-xs text-muted-foreground/40">
            No tasks yet. Add one above to get started.
          </p>
        )}
        {tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200",
              task.done
                ? "bg-white/3 opacity-60"
                : "bg-white/5 hover:bg-white/8",
            )}
          >
            {/* Toggle */}
            <button
              onClick={() => onToggle(task.id)}
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all",
                task.done
                  ? "border-primary bg-primary text-white"
                  : "border-border hover:border-primary/50",
              )}
            >
              {task.done && <Check className="h-3 w-3" />}
            </button>

            {/* Text */}
            <span
              className={cn(
                "flex-1 text-sm transition-all",
                task.done
                  ? "text-muted-foreground/50 line-through"
                  : "text-foreground",
              )}
            >
              {task.text}
            </span>

            {/* Pomodoro count */}
            <span className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground/50">
              <Target className="h-3 w-3" />
              {task.pomodoros}
            </span>

            {/* Delete */}
            <button
              onClick={() => onDelete(task.id)}
              className="shrink-0 text-muted-foreground/30 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
