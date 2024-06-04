"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ModalProvider } from "@/components/providers/ModalProvider";
import { cn } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "react-query";
import { initializeSubscriptions } from "@/lib/subscriptions";
import useTokenStore from "@/store/tokenStore";
const inter = Inter({ subsets: ["latin"] });
//@ts-ignore

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("dark:bg-[#1F1F1F]", inter.className)}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
      </body>
    </html>
  );
}
