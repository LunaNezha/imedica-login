import LightLoginImage from "@assets/images/login-light.png";
import DarkLoginImage from "@assets/images/login-dark.png";

import LightShadowBottomImage from "@assets/images/shadow-2-light.png";
import DarkShadowBottomImage from "@assets/images/shadow-2-dark.png";

import { useTheme } from "@src/providers/theme-provider";
import { useTranslation } from "react-i18next";
import { DARK } from "@src/constants/theme.const";
import { Button } from "@src/components/buttons";
import { PathNames } from "@src/constants/pathnames.const";
import { FA } from "@src/constants/langs.const";

const LoginInitial = () => {
  const version = __APP_VERSION__;
  const { t, i18n } = useTranslation("translations");
  const { theme } = useTheme();

  return (
    <div className="relative flex h-full items-center justify-center">
      {/* shadow bottom */}
      <img
        src={theme === DARK ? DarkShadowBottomImage : LightShadowBottomImage}
        className="absolute inset-x-auto bottom-0 -z-10 w-full"
        alt="shadow image"
      />

      {/* content */}
      <div className="z-10 flex flex-col gap-6 p-8">
        {/* illustration */}
        <img
          src={theme === DARK ? DarkLoginImage : LightLoginImage}
          className="mx-auto w-full object-contain"
          alt="login"
        />

        {/* titles */}
        <div className="flex flex-col items-center justify-center gap-[2px] text-center text-white-950 dark:text-white-200">
          <h2 className="text-2xl font-extrabold rtl:font-black">
            {t("titles.login_register")}
          </h2>

          <p className="w-10/12 text-base font-light opacity-80 dark:opacity-60 rtl:font-normal">
            {t("messages.login_welcome")}
          </p>
        </div>

        {/* login options */}
        <div className="flex flex-col gap-1 px-4">
          <span className="text-center text-sm text-white-950/70 dark:text-white-200/50">
            {t("globals.with")}
          </span>

          <div className="flex flex-col gap-3">
            {/* login with phone */}
            <div className="gradient-border-green-blue rounded-full">
              <Button
                fullWidth
                padding={"lg"}
                variant={"filled-default"}
                round={"full"}
                shadows={"none"}
                textSize={"md"}
                textTransform={"uppercase"}
                fontWeight={i18n.language === FA ? "extrabold" : "bold"}
                href={PathNames.LoginWithPhone}
              >
                <span className="gradient-text-green-blue bg-gradient-to-r">
                  {t("buttons.login_with_phone")}
                </span>
              </Button>
            </div>

            {/* login with username */}
            <div className="gradient-border-violet-blue rounded-full">
              <Button
                fullWidth
                padding={"lg"}
                variant={"filled-default"}
                round={"full"}
                shadows={"none"}
                textSize={"md"}
                textTransform={"uppercase"}
                fontWeight={i18n.language === FA ? "extrabold" : "bold"}
                href={PathNames.LoginWithUsername}
              >
                <span className="gradient-text-violet-blue bg-gradient-to-r">
                  {t("buttons.login_with_username")}
                </span>
              </Button>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-white-950/70 dark:text-white-200/60 ltr:font-montserrat rtl:font-iranyekan">
          {t("globals.version")} {version}
        </p>
      </div>
    </div>
  );
};

export default LoginInitial;
