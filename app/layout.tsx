import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import clsx from "clsx";
import ContextProvider from "@/components/appkitProvider";
import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

// 导入棉花团背景组件
import { CottonCloudBackground } from "@/components/cotton-cloud-background";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  const resolvedHeaders = await headers();
  const cookies = resolvedHeaders.get("cookie");
  return (
    <html suppressHydrationWarning lang={locale}>
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground font-sans antialiased relative",
          fontSans.variable
        )}
      >
        <ContextProvider cookies={cookies}>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <NextIntlClientProvider messages={messages}>
              <CottonCloudBackground />
              <div className="relative flex flex-col h-screen z-10">
                <Navbar />
                <main className="container mx-auto max-w-7xl pt-4 px-6 flex-grow relative">
                  {children}
                </main>
              </div>
            </NextIntlClientProvider>
          </Providers>
        </ContextProvider>
      </body>
    </html>
  );
}
