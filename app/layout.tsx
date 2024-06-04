"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ConvexClientProvider } from "@/components/providers/ConvexProvider";
import { ModalProvider } from "@/components/providers/ModalProvider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "react-query";
import { initializeSubscriptions } from "@/lib/subscriptions";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Jotion",
//   description: "The connected workspace where better, faster work happens.",
//   icons: {
//     icon: [
//       {
//         media: "(prefers-color-scheme: light)",
//         url: "/assets/logo.svg",
//         href: "/assets/logo.svg",
//       },
//       {
//         media: "(prefers-color-scheme: dark)",
//         url: "/assets/logo-dark.svg",
//         href: "/assets/logo-dark.svg",
//       },
//     ],
//   },
// };
const queryClient = new QueryClient();
initializeSubscriptions();



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("dark:bg-[#1F1F1F]", inter.className)}>
      <QueryClientProvider client={queryClient}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="note-theme"
            >
              <Toaster position="bottom-center" />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </QueryClientProvider>
      </body>
    </html>
  );
}
