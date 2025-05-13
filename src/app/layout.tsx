import type React from "react";
import "@/app/globals.css";
import StoreProvider from "@/store-provider";
import NextAuthSessionProvider from "@/wrapper/next-auth-session-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("auth layout");
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <StoreProvider>
          <NextAuthSessionProvider>
            <div className="flex min-h-screen">
              <main className="flex-1 overflow-x-hidden">{children}</main>
            </div>
          </NextAuthSessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
