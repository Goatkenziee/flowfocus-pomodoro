"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Bell, X } from "lucide-react";

interface NotificationToastProps {
  message: string;
  onDismiss: () => void;
  duration?: number;
}

export function NotificationToast({
  message,
  onDismiss,
  duration = 5000,
}: NotificationToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    const enter = setTimeout(() => setVisible(true), 50);
    // Auto dismiss
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, duration);

    return () => {
      clearTimeout(enter);
      clearTimeout(timer);
    };
  }, [message, duration, onDismiss]);

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0"
      )}
    >
      <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 px-5 py-3 shadow-xl shadow-primary/10 backdrop-blur-xl">
        <Bell className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-foreground">{message}</span>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(onDismiss, 300);
          }}
          className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
