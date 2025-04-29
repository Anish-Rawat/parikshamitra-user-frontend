import type { ReactNode } from "react";
import "@/app/globals.css";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}
