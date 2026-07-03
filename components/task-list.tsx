"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Task } from "@/lib/use-pomodoro";
import { Plus, Check, Trash2, Target, Circle } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  currentTaskId: string | null;
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string | null) => void;
}

export function TaskList({ tasks, currentTaskId, onAdd, onToggle, onDelete, onSelect }: TaskListProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input.trim());
      setInput("");
    }
  };

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold">Tasks</h3>
        <span className="text-sm text-muted-foreground">
          {activeTasks.length} active
        </span>
      </div>

      {/* Add task */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-5">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What are you working on?"
          className="flex-1 rounded-lg border bg-background/50 px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
        />
        <Button type="submit" size="icon" className="h-10 w-10 shrink-0" disabled={!input.trim()}>
          <Plus className="h-4 w-4" />
        </Button>
      </form>

      {/* Active tasks */}
      <div className="space-y-2">
        {activeTasks.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-6">
            No tasks yet. Add one above to get started.
          </p>
        )}
        {activeTasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            isActive={task.id === currentTaskId}
            onToggle={onToggle}
            onDelete={onDelete}
            onSelect={onSelect}
          />
        ))}
      </div>

      {/* Completed */}
      {completedTasks.length > 0 && (
        <>
          <div className="mt-6 mb-3 flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">
              {completedTasks.length} completed
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="space-y-1.5">
            {completedTasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                isActive={false}
                onToggle={onToggle}
                onDelete={onDelete}
                onSelect={onSelect}
              />
            ))}
          </div>
        </>
      )}
    </Card>
  );
}

function TaskRow({
  task,
  isActive,
  onToggle,
  onDelete,
  onSelect,
}: {
  task: Task;
  isActive: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string | null) => void;
}) {
  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 cursor-pointer",
        isActive
          ? "bg-primary/10 border border-primary/20 ring-1 ring-primary/20"
          : "hover:bg-muted/50 border border-transparent",
        task.completed && "opacity-50",
      )}
      onClick={() => onSelect(task.completed ? null : task.id)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle(task.id);
        }}
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
          task.completed
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground/40 hover:border-primary/60",
        )}
      >
        {task.completed && <Check className="h-3 w-3" />}
      </button>

      <span
        className={cn(
          "flex-1 text-sm transition-all",
          task.completed && "line-through text-muted-foreground",
          isActive && "font-medium text-primary",
        )}
      >
        {task.text}
      </span>

      {/* Pomodoro count */}
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Target className="h-3 w-3" />
        <span>{task.pomodoros}</span>
      </div>

      {isActive && (
        <span className="text-[10px] font-medium uppercase tracking-wider text-primary animate-pulse">
          Active
        </span>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-400"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
