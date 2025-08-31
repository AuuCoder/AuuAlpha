import React from "react";
import { User } from "@heroui/user";
import { Tooltip } from "@heroui/tooltip";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import Image from "next/image";
import { LogOut } from "lucide-react";

import { useAuthStore } from "@/stores/authStore";

const formatAddress = (address?: string) => {
  if (!address) return "";

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const IsLogin = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  // wagmi 断开钱包连接
  const handleLogout = () => {
    disconnect();
    useAuthStore.getState().clearAuth();
  };
  const { data } = useBalance({
    address,
    chainId: 56,
  });

  return (
    <Tooltip
      closeDelay={0}
      content={
        <div className="flex flex-col px-3 py-2 w-38  rounded-md  space-y-3">
          {/* 顶部头像+地址 */}
          <div className="flex items-center space-x-3">
            <Image
              alt="avatar"
              className="rounded-full"
              height={30}
              src="https://avatars.githubusercontent.com/u/30373425?v=4"
              width={30}
            />
            <div className="text-[12px]  flex flex-col">
              <span className="text-[12px]  ">{formatAddress(address)}</span>
              <span className="text-[12px]  ">
                {data?.formatted.slice(0, 5)} {data?.symbol}
              </span>
            </div>
          </div>

          {/* 分隔线 */}
          <div className="border-t border-gray-100" />

          {/* 操作区 */}
          <div className="flex flex-col space-y-2 text-sm">
            <button
              className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors focus:outline-none"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      }
      delay={0}
      motionProps={{
        variants: {
          exit: {
            opacity: 0,
            transition: {
              duration: 0.1,
              ease: "easeIn",
            },
          },
          enter: {
            opacity: 1,
            transition: {
              duration: 0.15,
              ease: "easeOut",
            },
          },
        },
      }}
    >
      <User
        avatarProps={{
          src: "https://avatars.githubusercontent.com/u/30373425?v=4",
          className: "w-7 h-7", // 外层触发按钮的头像大小
        }}
        name=""
      />
    </Tooltip>
  );
};

export default IsLogin;
