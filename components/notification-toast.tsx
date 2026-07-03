"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

interface NotificationToastProps {
  show: boolean;
  message: string;
}

export function NotificationToast({ show, message }: NotificationToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <div
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none",
      )}
    >
      <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-card/95 backdrop-blur-xl px-6 py-4 shadow-2xl shadow-primary/10">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
          <Bell className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">{message}</p>
          <p className="text-xs text-muted-foreground">Time to switch gears</p>
        </div>
      </div>
    </div>
  );
}
