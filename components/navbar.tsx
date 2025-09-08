"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import IsLogin from "@/components/isLogin";
import { useRef } from "react";
import { Button } from "@heroui/button";
import NextLink from "next/link";
import { useAccount, useDisconnect } from "wagmi";
import { modal } from "@/components/appkitProvider";
import { ThemeSwitch } from "@/components/theme-switch";
import LanguageSwitcher from "@/components/LangSwitch";
import { Logo } from "@/components/icons";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const Navbar = () => {
  const t = useTranslations("NavBar");
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const ref = useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      modal.open();
    }
  };
  return (
    <HeroUINavbar
      maxWidth="full"
      position="sticky"
      className="backdrop-blur-sm bg-transparent border-none"
      style={{ backgroundColor: "transparent" }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image src="/favicon.ico" alt="logo" width={32} height={32} />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
          <LanguageSwitcher />
          {!isConnected ? (
            <Button
              ref={ref}
              className="bg-black/10 dark:bg-white/10 
              transition-all duration-200 cursor-pointer border border-transparent
               hover:border-orange-400 hover:bg-white/10 text-sm font-normal p-4 w-24"
              size="md"
              variant="solid"
              onPress={handleClick}
            >
              {t("Connect")}
            </Button>
          ) : (
            <IsLogin />
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu></NavbarMenu>
    </HeroUINavbar>
  );
};
