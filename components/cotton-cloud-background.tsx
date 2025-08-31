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

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        zIndex: 1,
        width: "100vw",
        height: "100vh",
        left: 0,
        top: 0,
      }}
    >
      {mounted && theme !== "dark" && (
        <>
          {/* 基础渐变背景 */}
          <div
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ${
              theme === "dark"
                ? "bg-black"
                : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
            }`}
          />

          {/* 大型棉花团效果 */}
          {cottonClouds.map((cloud) => {
            const animationType =
              cloud.id % 3 === 0
                ? "float"
                : cloud.id % 3 === 1
                  ? "drift"
                  : "morph";
            return (
              <div
                key={cloud.id}
                className={`absolute blur-3xl ${
                  theme === "dark" ? "opacity-50" : "opacity-60"
                } ${
                  theme === "dark"
                    ? [
                        "bg-gradient-to-br from-violet-500/40 via-purple-500/30 to-blue-500/35",
                        "bg-gradient-to-br from-indigo-500/35 via-cyan-500/25 to-purple-500/30",
                        "bg-gradient-to-br from-blue-500/40 via-indigo-500/30 to-violet-500/35",
                        "bg-gradient-to-br from-purple-500/35 via-pink-500/25 to-indigo-500/30",
                        "bg-gradient-to-br from-cyan-500/40 via-blue-500/30 to-purple-500/35",
                        "bg-gradient-to-br from-pink-500/35 via-violet-500/25 to-cyan-500/30",
                      ][cloud.id % 6]
                    : [
                        "bg-gradient-to-br from-blue-300/60 via-purple-300/50 to-pink-300/60",
                        "bg-gradient-to-br from-purple-300/55 via-indigo-300/45 to-blue-300/55",
                        "bg-gradient-to-br from-pink-300/60 via-purple-300/50 to-indigo-300/60",
                        "bg-gradient-to-br from-indigo-300/55 via-blue-300/45 to-purple-300/55",
                        "bg-gradient-to-br from-violet-300/60 via-purple-300/50 to-blue-300/60",
                        "bg-gradient-to-br from-cyan-300/55 via-blue-300/45 to-indigo-300/55",
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
            const size = 60 + i * 4;
            const x = (i * 23) % 100;
            const y = (i * 37) % 100;
            const duration = 12 + (i % 6);
            const delay = i * 0.5;
            const animationType = i % 2 === 0 ? "float" : "drift";

            return (
              <div
                key={`medium-${i}`}
                className={`absolute blur-2xl ${
                  theme === "dark" ? "opacity-35" : "opacity-45"
                } ${
                  theme === "dark"
                    ? [
                        "bg-gradient-to-r from-violet-400/30 to-purple-400/25",
                        "bg-gradient-to-r from-cyan-400/25 to-blue-400/30",
                        "bg-gradient-to-r from-pink-400/30 to-violet-400/25",
                        "bg-gradient-to-r from-indigo-400/25 to-cyan-400/30",
                      ][i % 4]
                    : [
                        "bg-gradient-to-r from-blue-200/45 to-purple-200/45",
                        "bg-gradient-to-r from-purple-200/40 to-pink-200/40",
                        "bg-gradient-to-r from-indigo-200/45 to-blue-200/45",
                        "bg-gradient-to-r from-pink-200/40 to-indigo-200/40",
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
            const size = 30 + (i % 8) * 4;
            const x = (i * 17) % 100;
            const y = (i * 29) % 100;
            const duration = 8 + (i % 5);
            const delay = i * 0.3;

            return (
              <div
                key={`small-${i}`}
                className={`absolute blur-xl ${
                  theme === "dark" ? "opacity-25" : "opacity-35"
                } ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-violet-400/20 via-purple-400/15 to-cyan-400/18"
                    : "bg-gradient-to-br from-blue-200/35 via-purple-200/30 to-pink-200/35"
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
        </>
      )}
    </div>
  );
}
