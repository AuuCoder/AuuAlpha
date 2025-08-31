"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface RouteLoadingContextType {
  isRouteChanging: boolean;
}

const RouteLoadingContext = createContext<RouteLoadingContextType>({
  isRouteChanging: false,
});

export const useRouteLoading = () => {
  const context = useContext(RouteLoadingContext);
  return context;
};

export function RouteLoadingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const [prevUrl, setPrevUrl] = useState("");

  useEffect(() => {
    const currentUrl = pathname + searchParams.toString();
    
    if (prevUrl && prevUrl !== currentUrl) {
      // 路由开始变化
      setIsRouteChanging(true);
      
      // 模拟加载时间，实际项目中可以根据需要调整
      const timer = setTimeout(() => {
        setIsRouteChanging(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
    
    setPrevUrl(currentUrl);
  }, [pathname, searchParams, prevUrl]);

  return (
    <RouteLoadingContext.Provider value={{ isRouteChanging }}>
      {children}
    </RouteLoadingContext.Provider>
  );
}