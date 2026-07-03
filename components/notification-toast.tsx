"use client";

import { cn } from "@/lib/utils";
import { X, CheckCircle, Coffee } from "lucide-react";
import { useEffect, useState } from "react";

interface NotificationToastProps {
  show: boolean;
  message: string;
}

export function NotificationToast({ show, message }: NotificationToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  const isFocusComplete = message.includes("Focus");

  return (
    <div
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-2xl border border-border/50 bg-black/80 backdrop-blur-xl px-5 py-3 shadow-2xl shadow-primary/10 transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full",
          isFocusComplete
            ? "bg-primary/20 text-primary"
            : "bg-accent/20 text-accent",
        )}
      >
        {isFocusComplete ? (
          <CheckCircle className="h-4 w-4" />
        ) : (
          <Coffee className="h-4 w-4" />
        )}
      </div>
      <span className="text-sm font-medium text-foreground">{message}</span>
    </div>
  );
}
