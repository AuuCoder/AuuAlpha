"use client";

import GlitchText from "@/blocks/TextAnimations/GlitchText/GlitchText";
import Cardswap, { Card } from "@/blocks/Components/Cardswap/Cardswap";
export default function Home() {
  return (
    <div className="relative h-full w-full overflow-x-hidden">
      {/* 主要内容区域 - GlitchText */}
      <div className="flex items-start justify-start h-[calc(100vh-6rem)] px-4 sm:px-8 lg:px-16 pt-16 sm:pt-20 lg:pt-24">
        <div className="w-full max-w-6xl">
          <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={false}
            className="leading-tight w-full text-left"
          >
            Mario Faster
          </GlitchText>
        </div>
      </div>

      {/* 右下角固定的 Cardswap */}
      <Cardswap
        width={600}
        height={400}
        cardDistance={60}
        verticalDistance={70}
        skewAmount={0}
        delay={4000}
        pauseOnHover={false}
      >
        <Card className="p-6 backdrop-blur-sm border border-divider">
          <h3 className="text-xl font-bold text-foreground mb-3">Innovation</h3>
          <p className="text-foreground-500">
            Cutting-edge technology meets elegant design
          </p>
        </Card>
        <Card className="p-6 backdrop-blur-sm border border-divider">
          <h3 className="text-xl font-bold text-foreground mb-3">
            Performance
          </h3>
          <p className="text-foreground-500">
            Lightning-fast interactions and smooth animations
          </p>
        </Card>
        <Card className="p-6 backdrop-blur-sm border border-divider">
          <h3 className="text-xl font-bold text-foreground mb-3">Experience</h3>
        </Card>
      </Cardswap>
    </div>
  );
}
