"use client";

import { Button } from "@heroui/button";
import { useLoading } from "@/contexts/loading-context";
import Link from "next/link";

export default function Home() {
  const { showLoading, hideLoading } = useLoading();

  const handleShowLoading = () => {
    showLoading();
    // 模拟异步操作
    setTimeout(() => {
      hideLoading();
    }, 5000);
  };

  return (
    <div className="relative min-h-[calc(91vh-4rem)] flex items-center justify-center"></div>
  );
}
