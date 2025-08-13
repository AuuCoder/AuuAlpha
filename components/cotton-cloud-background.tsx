"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// 棉花团背景组件
export function CottonCloudBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [cottonClouds, setCottonClouds] = useState<
    Array<{
      id: number;
      size: number;
      x: number;
      y: number;
      duration: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    setMounted(true);
    // 生成棉花团配置
    const clouds = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: Math.random() * 300 + 150,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
    }));
    setCottonClouds(clouds);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        zIndex: -999,
        width: "100vw",
        height: "100vh",
        left: 0,
        top: 0,
      }}
    >
      {/* 基础渐变背景 */}
      <div
        className={`absolute inset-0 w-full h-full transition-all duration-1000 ${
          theme === "dark"
            ? "bg-transparent"
            : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
        }`}
      />

      {/* 大型棉花团效果 */}
      {cottonClouds.map((cloud) => {
        const animationType =
          cloud.id % 3 === 0 ? "float" : cloud.id % 3 === 1 ? "drift" : "morph";
        return (
          <div
            key={cloud.id}
            className={`absolute blur-3xl opacity-50 ${
              theme === "dark"
                ? [
                    "bg-gradient-to-br from-blue-500/25 via-indigo-500/20 to-purple-500/25",
                    "bg-gradient-to-br from-purple-500/20 via-blue-500/15 to-indigo-500/20",
                    "bg-gradient-to-br from-indigo-500/25 via-purple-500/20 to-blue-500/25",
                    "bg-gradient-to-br from-slate-500/20 via-gray-500/15 to-slate-500/20",
                    "bg-gradient-to-br from-gray-500/25 via-slate-500/20 to-gray-500/25",
                    "bg-gradient-to-br from-blue-400/20 via-slate-400/15 to-indigo-400/20",
                  ][cloud.id % 6]
                : [
                    "bg-gradient-to-br from-blue-300/50 via-purple-300/40 to-pink-300/50",
                    "bg-gradient-to-br from-purple-300/45 via-indigo-300/35 to-blue-300/45",
                    "bg-gradient-to-br from-pink-300/50 via-purple-300/40 to-indigo-300/50",
                    "bg-gradient-to-br from-indigo-300/45 via-blue-300/35 to-purple-300/45",
                    "bg-gradient-to-br from-violet-300/50 via-purple-300/40 to-blue-300/50",
                    "bg-gradient-to-br from-cyan-300/45 via-blue-300/35 to-indigo-300/45",
                  ][cloud.id % 6]
            }`}
            style={{
              width: `${cloud.size}px`,
              height: `${cloud.size}px`,
              left: `${cloud.x}%`,
              top: `${cloud.y}%`,
              animation: `${animationType} ${cloud.duration}s ease-in-out infinite`,
              animationDelay: `${cloud.delay}s`,
              transform: `translate(-50%, -50%)`,
              borderRadius:
                cloud.id % 2 === 0 ? "50% 40% 60% 30%" : "40% 60% 30% 70%",
            }}
          />
        );
      })}

      {/* 中型棉花团 */}
      {Array.from({ length: 15 }, (_, i) => {
        const size = 60 + i * 4; // 固定尺寸避免每次渲染都变化
        const x = (i * 23) % 100; // 固定位置
        const y = (i * 37) % 100;
        const duration = 12 + (i % 6);
        const delay = i * 0.5;
        const animationType = i % 2 === 0 ? "float" : "drift";

        return (
          <div
            key={`medium-${i}`}
            className={`absolute blur-2xl opacity-35 ${
              theme === "dark"
                ? [
                    "bg-gradient-to-r from-blue-400/20 to-indigo-400/20",
                    "bg-gradient-to-r from-slate-400/15 to-gray-400/15",
                    "bg-gradient-to-r from-indigo-400/20 to-blue-400/20",
                    "bg-gradient-to-r from-gray-400/15 to-slate-400/15",
                  ][i % 4]
                : [
                    "bg-gradient-to-r from-blue-200/35 to-purple-200/35",
                    "bg-gradient-to-r from-purple-200/30 to-pink-200/30",
                    "bg-gradient-to-r from-indigo-200/35 to-blue-200/35",
                    "bg-gradient-to-r from-pink-200/30 to-indigo-200/30",
                  ][i % 4]
            }`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}%`,
              top: `${y}%`,
              animation: `${animationType} ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
              transform: `translate(-50%, -50%)`,
              borderRadius: `${40 + (i % 3) * 10}% ${30 + (i % 4) * 15}% ${50 + (i % 2) * 10}% ${35 + (i % 5) * 10}%`,
            }}
          />
        );
      })}

      {/* 小型棉花团 */}
      {Array.from({ length: 25 }, (_, i) => {
        const size = 30 + (i % 8) * 4; // 固定尺寸
        const x = (i * 17) % 100; // 固定位置
        const y = (i * 29) % 100;
        const duration = 8 + (i % 5);
        const delay = i * 0.3;

        return (
          <div
            key={`small-${i}`}
            className={`absolute blur-xl opacity-25 ${
              theme === "dark"
                ? "bg-gradient-to-br from-blue-400/12 via-slate-400/8 to-indigo-400/12"
                : "bg-gradient-to-br from-blue-200/25 via-purple-200/20 to-pink-200/25"
            }`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}%`,
              top: `${y}%`,
              animation: `morph ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
              transform: `translate(-50%, -50%)`,
              borderRadius: `${45 + (i % 3) * 5}% ${35 + (i % 4) * 10}% ${55 + (i % 2) * 5}% ${40 + (i % 5) * 8}%`,
            }}
          />
        );
      })}
    </div>
  );
}
