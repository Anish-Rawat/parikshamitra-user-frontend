"use client";

import type React from "react";
import { Inter } from "next/font/google";
import "../../../src/app/globals.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { AppSidebar } from "@/components/app-sidebar";
// import { SidebarProvider } from "@/components/ui/sidebar";

// Load Inter font
const inter = Inter({ subsets: ["latin"] });

// Create a basic MUI theme (you can later expand it)
const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f8fafc", // equivalent to bg-slate-50
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
            <div style={{ display: "flex", minHeight: "100vh" }}>
              <AppSidebar />
              <main style={{ flexGrow: 1, overflowY: "auto", backgroundColor: lightTheme.palette.background.default }}>
                {children}
              </main>
            </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
