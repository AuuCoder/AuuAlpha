"use client";

import { useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import { setLocale } from "@/i18n";
import { type Locale, locales } from "@/i18n/config";

export default function LangSwitch() {
  const [ZH, EN] = locales;
  const locale = useLocale();

  // 切换语言
  function onChangeLang(value: Locale) {
    const locale = value as Locale;
    setLocale(locale);
  }
  return (
    <Button
      variant="ghost"
      size="icon"
      className="cursor-pointer text-sm w-10 h-10 rounded-full
      
       bg-black/10 dark:bg-white/10 transition-all duration-200 
       hover:border  hover:border-orange-400"
      onClick={() => onChangeLang(locale === ZH ? EN : ZH)}
    >
      {locale === ZH ? "中" : "EN"}
    </Button>
  );
}
