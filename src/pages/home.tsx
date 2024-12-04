import { IonContent, IonPage } from "@ionic/react";
import { Button } from "@src/components/buttons";
import { PathNames } from "@src/constants/pathnames.const";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

const Home = () => {
  const history = useHistory();
  const { t } = useTranslation("translations");

  return (
    <IonContent>
      <div className="flex h-full items-center justify-center">
        <Button
          type="button"
          variant={"filled-green"}
          textSize={"md"}
          padding={"md"}
          shadows={"md"}
          round={"xl"}
          fontWeight={"bold"}
          onClick={() => history.push(PathNames.Login)}
        >
          <i className="fi fi-sr-user"></i>
          <span>{t("buttons.login")}</span>
        </Button>
      </div>
    </IonContent>
  );
};

export default Home;
