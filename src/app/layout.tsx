import type React from "react";
import "@/app/globals.css";
import ReduxWrapper from "@/wrapper/redux-wrapper";

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
        <div className="flex min-h-screen">
          <main className="flex-1 overflow-x-hidden">
            <ReduxWrapper>{children}</ReduxWrapper>
          </main>
        </div>
      </body>
    </html>
  );
}
