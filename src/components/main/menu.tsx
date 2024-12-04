import { IonContent, IonMenu } from "@ionic/react";
import { EN } from "@src/constants/langs.const";
import { Directions } from "@src/enums/directions.enum";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menus } from "@src/@types/menus.type";
import { PathNames } from "@src/constants/pathnames.const";
import i18next from "i18next";

const Menu = () => {
  let currentDirection = document.body.dir;
  const menuElement = document.getElementById("menu");
  const { t, ready } = useTranslation("translations");
  if (!ready) return null;

  const menuItems: Menus[] = [
    {
      title: t("menus.dashboard"),
      url: PathNames.Home,
      icon: "fi fi-rr-house-chimney",
    },
    {
      title: t("menus.user_profile"),
      url: "/",
      icon: "fi fi-rr-circle-user",
    },
  ];

  function handleMenuDirection() {
    if (currentDirection == Directions.LTR) {
      menuElement?.setAttribute("side", "start");
      menuElement?.setAttribute("dir", "ltr");
    } else {
      menuElement?.setAttribute("side", "start");
      menuElement?.setAttribute("dir", "rtl");
    }
  }

  useEffect(() => {
    handleMenuDirection();

    i18next.on("languageChanged", function (lang) {
      currentDirection = lang == EN ? Directions.LTR : Directions.RTL;
      handleMenuDirection();
    });
  }, []);

  return (
    <IonMenu id="menu" contentId="main" type="overlay">
      <IonContent className="ion-no-padding">Menu</IonContent>
    </IonMenu>
  );
};

export default Menu;
