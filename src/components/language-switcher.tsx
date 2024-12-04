import { IonAlert } from "@ionic/react";
import { EN, ENGLISH, FA, PERSIAN } from "@src/constants/langs.const";
import { LANGUAGE } from "@src/constants/local-storage.const";
import { Directions } from "@src/enums/directions.enum";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import secureLocalStorage from "react-secure-storage";
import { Button } from "./buttons";
import IranFlag from "@assets/images/iran.png";
import UnitedStatesFlag from "@assets/images/united-states.png";

const LanguageSwitcher = () => {
  const [direction, setDirection] = useState(
    secureLocalStorage.getItem(LANGUAGE)
      ? String(secureLocalStorage.getItem(LANGUAGE)) == FA
        ? Directions.RTL
        : Directions.LTR
      : Directions.RTL,
  );

  const [isAlertOpen, setAlertOpen] = useState(false);
  const { t, i18n } = useTranslation("translations");

  const handleChangeDirection = (dir: Directions) => {
    setDirection(dir);
  };

  useEffect(() => {
    document.body.dir = direction;
    document.title = t("app_title");
  }, [t]);

  return (
    <>
      <Button
        padding={"none"}
        variant={"filled-default"}
        round={"full"}
        shadows={"none"}
        onClick={() => setAlertOpen(true)}
      >
        {i18n.language === FA ? (
          <img
            src={UnitedStatesFlag}
            alt="united states flag"
            className="size-8 rounded-full"
          />
        ) : (
          <img src={IranFlag} alt="iran flag" className="size-8 rounded-full" />
        )}
      </Button>

      <IonAlert
        buttons={[]}
        isOpen={isAlertOpen}
        onDidDismiss={() => setAlertOpen(false)}
        header={t("choose_lang.header")}
        inputs={[
          {
            label: PERSIAN,
            type: "radio",
            value: FA,
            checked: i18n.language === FA,
            handler: () => {
              handleChangeDirection(Directions.RTL);
              i18n.changeLanguage(FA);
              secureLocalStorage.setItem(LANGUAGE, FA);
              setAlertOpen(false);
            },
          },
          {
            label: ENGLISH,
            type: "radio",
            value: EN,
            checked: i18n.language === EN,
            handler: () => {
              handleChangeDirection(Directions.LTR);
              i18n.changeLanguage(EN);
              secureLocalStorage.setItem(LANGUAGE, EN);
              setAlertOpen(false);
            },
          },
        ]}
      />
    </>
  );
};

export default LanguageSwitcher;
