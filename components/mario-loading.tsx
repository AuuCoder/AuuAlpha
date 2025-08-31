"use client";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";

interface MarioLoadingProps {
  isVisible: boolean;
}

interface Coin {
  id: number;
  x: number;
  delay: number;
  size: number;
  rotationSpeed: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

const MarioLoading: React.FC<MarioLoadingProps> = ({ isVisible }) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [marioJump, setMarioJump] = useState(false);
  const [shakeScreen, setShakeScreen] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [comboCount, setComboCount] = useState(0);
  const marioControls = useAnimation();
  const brickControls = useAnimation();
  const containerControls = useAnimation();

  useEffect(() => {
    if (!isVisible) return;

    const animationCycle = async () => {
      // 马里奥准备跳跃的蹲下动作 - 几乎没有前摇
      await marioControls.start({
        scaleY: 0.95,
        y: 1,
        transition: { duration: 0.05, ease: "easeOut" },
      });

      setMarioJump(true);

      // 马里奥跳跃动画 - 更快更直接
      const jumpPromise = marioControls.start({
        y: [1, -30, -35, -30, 1],
        scaleY: [0.95, 1.05, 1, 1.05, 1],
        scaleX: [1, 0.98, 1, 0.98, 1],
        transition: {
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
          times: [0, 0.3, 0.5, 0.7, 1],
        },
      });

      // 撞击时的特效爆发 - 更快触发
      setTimeout(() => {
        // 屏幕震动
        setShakeScreen(true);
        containerControls.start({
          x: [0, -1, 1, -0.5, 0.5, 0],
          y: [0, -0.5, 0.5, -0.25, 0.25, 0],
          transition: { duration: 0.15, ease: "easeOut" },
        });

        // 爆炸特效
        setShowExplosion(true);

        // 砖块撞击动画 - 更快反应
        brickControls.start({
          scale: [1, 0.96, 1.01, 1],
          y: [0, 0.5, -0.5, 0],
          rotateX: [0, -0.5, 0.5, 0],
          boxShadow: [
            "2px 2px 0px rgba(0,0,0,0.5)",
            "0 0 15px rgba(210, 105, 30, 0.8)",
            "0 0 20px rgba(210, 105, 30, 0.6)",
            "2px 2px 0px rgba(0,0,0,0.5)",
          ],
          transition: {
            duration: 0.2,
            ease: "easeOut",
            times: [0, 0.3, 0.7, 1],
          },
        });

        // 生成简化爆炸粒子
        const explosionParticles = Array.from({ length: 4 }, (_, i) => {
          const angle = (i / 4) * Math.PI * 2;
          const speed = 1.2 + Math.random() * 1.5;
          return {
            id: Date.now() + i + 1000,
            x: 0,
            y: -20,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: ["#fbbf24", "#f59e0b", "#d97706"][
              Math.floor(Math.random() * 3)
            ],
            size: 1.5 + Math.random() * 1.5,
          };
        });
        setParticles((prev) => [...prev, ...explosionParticles]);

        setTimeout(() => {
          setShakeScreen(false);
          setShowExplosion(false);
        }, 200);
      }, 120);

      // 生成单个USDT币 - 更快出现
      setTimeout(() => {
        const newCoin = {
          id: Date.now(),
          x: 0, // 居中
          delay: 0,
          size: 1,
          rotationSpeed: 360,
        };
        setCoins((prev) => [...prev, newCoin]);
        setComboCount((prev) => prev + 1);
      }, 150);

      await jumpPromise;
      setMarioJump(false);

      // 清理旧特效 - 更快清理
      setTimeout(() => {
        setCoins((prev) => prev.filter((coin) => Date.now() - coin.id < 1500));
        setParticles((prev) =>
          prev.filter((particle) => Date.now() - particle.id < 800)
        );
      }, 1500);
    };

    const interval = setInterval(animationCycle, 1200);

    // 立即开始第一个循环，无延迟
    setTimeout(() => {
      animationCycle();
    }, 50); // 很短的延迟确保组件已挂载

    return () => clearInterval(interval);
  }, [isVisible, marioControls, brickControls, containerControls]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        animate={containerControls}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={`fixed inset-0 z-50 flex items-center justify-center ${shakeScreen ? "animate-pulse" : ""}`}
        style={{
          background: `rgba(0, 0, 0, 0.8)`
        }}
      >
        {/* 爆炸粒子 */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                x: particle.x,
                y: particle.y,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                x: particle.x + particle.vx * 50,
                y: particle.y + particle.vy * 50,
                scale: [1, 0.5, 0],
                opacity: [1, 0.8, 0],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute z-40 rounded-full transform-gpu"
              style={{
                backgroundColor: particle.color,
                width: particle.size,
                height: particle.size,
                left: "50%",
                top: "45%",
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              }}
            />
          ))}
        </AnimatePresence>

        {/* 简化连击数字显示 */}
        <AnimatePresence>
          {comboCount > 20 && comboCount % 10 === 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: -30 }}
              animate={{ scale: 1, opacity: 1, y: -50 }}
              exit={{ scale: 0, opacity: 0, y: -70 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute top-1/3 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div
                className="text-xl font-bold text-yellow-300 px-2 py-1"
                style={{
                  imageRendering: "pixelated",
                  textShadow: "2px 2px 0px rgba(0,0,0,0.8)",
                  fontFamily: "monospace",
                }}
              >
                {comboCount}!
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 主要动画容器 */}
        <div className="relative flex flex-col items-center">
          {/* 砖块 - 经典像素风格 */}
          <motion.div
            animate={brickControls}
            className="w-16 h-16 mb-4 relative transform-gpu z-20"
            style={{
              backgroundColor: "#D2691E",
              imageRendering: "pixelated",
              boxShadow: showExplosion
                ? "0 0 40px rgba(210, 105, 30, 1)"
                : "2px 2px 0px rgba(0,0,0,0.5)",
            }}
          >
            {/* 砖块经典纹理 - 像素格子 */}
            <div className="absolute inset-0">
              {/* 水平线条 */}
              <div className="absolute top-0 left-0 w-full h-1 bg-black opacity-20" />
              <div className="absolute top-4 left-0 w-full h-1 bg-black opacity-10" />
              <div className="absolute top-8 left-0 w-full h-1 bg-black opacity-10" />
              <div className="absolute top-12 left-0 w-full h-1 bg-black opacity-10" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-black opacity-30" />

              {/* 垂直线条 */}
              <div className="absolute top-0 left-0 w-1 h-full bg-black opacity-20" />
              <div className="absolute top-0 left-8 w-1 h-full bg-black opacity-10" />
              <div className="absolute top-0 right-0 w-1 h-full bg-black opacity-30" />

              {/* 砖块分割线 */}
              <div className="absolute top-2 left-2 w-4 h-1 bg-yellow-600 opacity-40" />
              <div className="absolute top-6 right-2 w-4 h-1 bg-yellow-600 opacity-40" />
              <div className="absolute top-10 left-2 w-4 h-1 bg-yellow-600 opacity-40" />
            </div>
          </motion.div>

          {/* 马里奥角色 - 经典像素风格 */}
          <motion.div
            animate={marioControls}
            className="relative w-16 h-16 mb-12 z-30 transform-gpu"
            style={{
              imageRendering: "pixelated",
              filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.8))",
            }}
          >
            {/* 马里奥帽子 - 经典红色 */}
            <div
              className="absolute top-0 left-2 w-12 h-4"
              style={{
                backgroundColor: "#FF0000",
                clipPath: "polygon(0% 100%, 25% 0%, 75% 0%, 100% 100%)",
              }}
            >
              {/* 帽子上的M标志 */}
              <div className="absolute top-1 left-1 w-2 h-2 bg-white" />
              <div className="absolute top-1 left-2 w-1 h-1 bg-red-600" />
            </div>

            {/* 马里奥脸部 - 像素块状 */}
            <div
              className="absolute top-3 left-2 w-12 h-5"
              style={{ backgroundColor: "#FFDBAC" }}
            >
              {/* 眼睛 */}
              <div className="absolute top-1 left-2 w-1 h-1 bg-black" />
              <div className="absolute top-1 left-5 w-1 h-1 bg-black" />
              {/* 鼻子 */}
              <div className="absolute top-2 left-4 w-2 h-1 bg-black" />
              {/* 胡子 */}
              <div className="absolute top-3 left-3 w-1 h-1 bg-black" />
              <div className="absolute top-3 left-5 w-1 h-1 bg-black" />
            </div>

            {/* 马里奥身体 - 经典蓝色工装 */}
            <div
              className="absolute top-7 left-1 w-14 h-6"
              style={{ backgroundColor: "#0066FF" }}
            >
              {/* 工装扣子 */}
              <div className="absolute top-1 left-2 w-2 h-2 bg-yellow-400" />
              <div className="absolute top-1 right-2 w-2 h-2 bg-yellow-400" />
              {/* 肩带 */}
              <div className="absolute top-0 left-1 w-2 h-6 bg-yellow-400" />
              <div className="absolute top-0 right-1 w-2 h-6 bg-yellow-400" />
            </div>

            {/* 马里奥手臂 - 像素块 */}
            <div
              className="absolute top-8 left-0 w-2 h-4"
              style={{ backgroundColor: "#FFDBAC" }}
            />
            <div
              className="absolute top-8 right-0 w-2 h-4"
              style={{ backgroundColor: "#FFDBAC" }}
            />

            {/* 马里奥腿部 - 经典蓝色 */}
            <div
              className="absolute top-12 left-2 w-4 h-4"
              style={{ backgroundColor: "#0066FF" }}
            />
            <div
              className="absolute top-12 right-2 w-4 h-4"
              style={{ backgroundColor: "#0066FF" }}
            />

            {/* 马里奥鞋子 - 棕色 */}
            <div
              className="absolute bottom-0 left-1 w-5 h-2"
              style={{ backgroundColor: "#8B4513" }}
            />
            <div
              className="absolute bottom-0 right-1 w-5 h-2"
              style={{ backgroundColor: "#8B4513" }}
            />

            {/* 马里奥脚下阴影 - 像素化 */}
            <motion.div
              animate={{
                scale: marioJump ? [1, 0.7, 1] : [1, 1.1, 1],
                opacity: marioJump ? [0.5, 0.2, 0.5] : [0.5, 0.6, 0.5],
              }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="absolute -bottom-1 left-3 w-10 h-2 bg-black opacity-50"
              style={{ imageRendering: "pixelated" }}
            />
          </motion.div>

          {/* USDT币向上消失动画 */}
          <AnimatePresence>
            {coins.map((coin) => (
              <motion.div
                key={coin.id}
                initial={{
                  y: -40,
                  x: coin.x,
                  opacity: 1,
                  scale: coin.size,
                  rotate: 0,
                }}
                animate={{
                  y: -120, // 向上移动
                  opacity: [1, 1, 0.5, 0],
                  scale: [
                    coin.size,
                    coin.size * 1.2,
                    coin.size * 0.8,
                    coin.size * 0.5,
                  ],
                  rotate: [0, coin.rotationSpeed],
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                  y: -150,
                }}
                transition={{
                  duration: 1.5,
                  delay: coin.delay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  times: [0, 0.4, 0.8, 1],
                }}
                className="absolute z-10 transform-gpu"
                style={{
                  top: -40,
                  filter: "drop-shadow(1px 1px 0px rgba(0,0,0,0.8))",
                }}
              >
                <div className="relative w-10 h-10">
                  {/* USDT币主体 - 真实USDT颜色和设计 */}
                  <div
                    className="w-full h-full rounded-full border-2 relative overflow-hidden"
                    style={{
                      backgroundColor: "#26A17B", // USDT官方绿色
                      borderColor: "#1F8A66",
                      imageRendering: "pixelated",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    {/* 外圈白色边框 */}
                    <div className="absolute inset-0 rounded-full border-2 border-white opacity-90" />

                    {/* 币面内容 */}
                    <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                      {/* USDT标志 - 真实设计 */}
                      <div className="flex flex-col items-center justify-center">
                        {/* 圆形背景 */}
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#26A17B" }}
                        >
                          {/* USDT字母 */}
                          <span
                            className="text-[6px] font-bold text-white leading-none"
                            style={{
                              fontFamily: "Arial, sans-serif",
                              fontWeight: "900",
                            }}
                          >
                            ₮
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 真实感光泽效果 */}
                    <div
                      className="absolute top-1 left-1 w-2 h-2 rounded-full opacity-40"
                      style={{ backgroundColor: "white" }}
                    />

                    {/* 底部阴影 */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-2 rounded-b-full opacity-20"
                      style={{ backgroundColor: "#1F8A66" }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MarioLoading;
