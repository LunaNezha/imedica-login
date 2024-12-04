import LightShadowImage from "@assets/images/shadow-light.png";
import DarkShadowImage from "@assets/images/shadow-dark.png";
import React, { useEffect, useRef, useState } from "react";
import ThemeSwitcher from "@src/components/theme-switcher";
import LanguageSwitcher from "@src/components/language-switcher";
import { useTheme } from "@src/providers/theme-provider";
import { useTranslation } from "react-i18next";
import { DARK } from "@src/constants/theme.const";
import { cn } from "@src/utils/classnames";

type Props = {
  children?: React.ReactNode;
};

const AuthLayout = (props: Props) => {
  const { children } = props;
  const { t } = useTranslation("translations");
  const { theme } = useTheme();
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        containerRef.current.scrollTop > 50
          ? setIsSticky(true)
          : setIsSticky(false);
      }
    };

    const container = containerRef.current;

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex h-full w-full max-w-sm flex-col overflow-y-auto overflow-x-hidden bg-white-50 drop-shadow-light no-scrollbar dark:bg-ebony-950"
    >
      {/* shadow top left */}
      <img
        src={theme === DARK ? DarkShadowImage : LightShadowImage}
        className="absolute -left-20 -top-20 -z-10 size-80"
        alt="shadow image"
      />

      {/* shadow bottom right */}
      <img
        src={theme === DARK ? DarkShadowImage : LightShadowImage}
        className="absolute -bottom-20 -right-20 -z-10 size-80"
        alt="shadow image"
      />

      {/* header */}
      <div
        className={cn(
          "sticky top-0 flex items-center justify-between gap-4 px-6 py-4 transition-all",
          isSticky
            ? "z-50 bg-white-50 drop-shadow-light dark:bg-ebony-950"
            : "bg-transparent",
        )}
      >
        {/* theme switcher */}
        <ThemeSwitcher />

        {/* titles */}
        <h2 className="text-base font-bold text-white-950 drop-shadow-md dark:text-white-200 rtl:font-extrabold">
          {t("app_title")}
        </h2>

        {/* language switcher */}
        <LanguageSwitcher />
      </div>

      {/* children content */}
      {children}
    </div>
  );
};

export default AuthLayout;
