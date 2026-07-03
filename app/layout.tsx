import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowFocus — Entrepreneur's Pomodoro Timer",
  description: "A modern Pomodoro timer built for entrepreneurs. Track focus sessions, manage tasks, and optimize your productivity.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ ["--font-sans" as string]: "Inter, system-ui, sans-serif" }}>
      <body>{children}</body>
    </html>
  );
}
