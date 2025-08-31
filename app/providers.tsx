"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ToastProvider } from "@heroui/toast";
import { LoadingProvider } from "@/contexts/loading-context";
import { RouteLoadingProvider } from "@/contexts/route-loading-context";
import MarioLoading from "@/components/mario-loading";
import { useLoading } from "@/contexts/loading-context";
import { useRouteLoading } from "@/contexts/route-loading-context";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

const ProvidersContent = ({ children, themeProps }: ProvidersProps) => {
  const router = useRouter();
  const { isLoading } = useLoading();
  const { isRouteChanging } = useRouteLoading();

  return (
    <HeroUIProvider navigate={router.push}>
      <ToastProvider />
      <NextThemesProvider {...themeProps}>
        {children}
        {/* 显示Loading：手动触发 或 路由切换 */}
        <MarioLoading isVisible={isLoading || isRouteChanging} />
      </NextThemesProvider>
    </HeroUIProvider>
  );
};

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <LoadingProvider>
      <RouteLoadingProvider>
        <ProvidersContent themeProps={themeProps}>
          {children}
        </ProvidersContent>
      </RouteLoadingProvider>
    </LoadingProvider>
  );
}
