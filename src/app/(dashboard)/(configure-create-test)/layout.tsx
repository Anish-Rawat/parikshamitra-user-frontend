"use client";

import type { ReactNode } from "react";
import "@/app/globals.css";
import { usePathname } from "next/navigation";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Create Test</h1>
        <p className="mb-6 text-gray-600">
          Create a custom test and share it with others
        </p>

        <div className="flex space-x-2 mb-6">
          <button
            className={`flex-1 py-2 rounded
             ${pathname === "/create-test" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            disabled={pathname === "/create-test"}
          >
            Configure Test
          </button>
          <button
            className={`flex-1 py-2 rounded ${pathname === "/select-questions" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            disabled={pathname === "/create-test"}
          >
            Select Questions
          </button>
        </div>
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
