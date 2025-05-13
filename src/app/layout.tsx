import type React from "react";
import "@/app/globals.css";
import StoreProvider from "@/wrapper/store-provider";
import { ToastContainer } from "react-toastify";
import NextAuthSessionProvider from "@/wrapper/next-auth-session-provider";
import TokenLoader from "@/components/token-loader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <NextAuthSessionProvider>
          <StoreProvider>
            <ToastContainer />
             <TokenLoader />
            <div className="flex min-h-screen">
              <main className="flex-1 overflow-x-hidden">{children}</main>
            </div>
          </StoreProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
