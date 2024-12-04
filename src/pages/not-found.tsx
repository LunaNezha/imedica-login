import ErrorImageDark from "@assets/images/error-404-dark.png";
import ErrorImageLight from "@assets/images/error-404-light.png";

import { Button } from "@src/components/buttons";
import { PathNames } from "@src/constants/pathnames.const";
import { DARK } from "@src/constants/theme.const";
import { useTheme } from "@src/providers/theme-provider";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const { theme } = useTheme();
  const history = useHistory();
  const { t } = useTranslation("translations");

  useEffect(() => {
    document.title = t("titles.not_found");
  }, []);

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-6">
      {/* image */}
      <div className="flex">
        <img
          src={theme === DARK ? ErrorImageDark : ErrorImageLight}
          alt="Unauthorized Image"
          className="h-full w-full object-contain"
        />
      </div>

      {/* content */}
      <div className="flex flex-col items-center justify-center gap-10 p-8 text-white-950 dark:text-white-200">
        {/* titles */}
        <div className="flex flex-col items-center justify-center gap-[2px] text-center ltr:font-montserrat rtl:font-iranyekan">
          <h2 className="text-2xl font-extrabold rtl:font-black">
            {t("titles.404_erorr")}
          </h2>

          <p className="w-10/12 text-base font-light opacity-80 dark:opacity-60 rtl:font-normal">
            {t("messages.error_404")}
          </p>
        </div>

        {/* go back home */}
        <Button
          fullWidth
          type="button"
          variant={"filled-green"}
          textSize={"md"}
          padding={"lg"}
          shadows={"md"}
          round={"full"}
          fontWeight={"bold"}
          onClick={() => history.push(PathNames.Home)}
        >
          <i className="fi fi-sr-home"></i>
          <span>{t("buttons.back_home")}</span>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
