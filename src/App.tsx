import "./theme/globals.css";
import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { lazy, Suspense } from "react";
import { appConfig } from "./config/app-config";
import { useTranslation } from "react-i18next";
import Routes from "./routes/routes";
import AppLoading from "./pages/app-loading";
import Menu from "./components/auth/menu";

setupIonicReact({ mode: "ios" });
const DevTools = import.meta.env.DEV
  ? lazy(() => import("./components/dev/dev-tools"))
  : null;

export default function App() {
  const { t } = useTranslation();
  return (
    <div className="device-stage">
      <div className="desktop-caption" aria-hidden="true">
        <span>
          iMedica<span className="brand-dot">.</span>
        </span>
        <p>{t("auth.stage_caption")}</p>
      </div>
      <div className="device-frame">
        <Suspense fallback={<AppLoading />}>
          <IonApp>
            <IonReactRouter basename={import.meta.env.BASE_URL}>
              <Menu />
              <div id="app-content" className="app-content">
                <Routes />
                {DevTools && appConfig.devTools && (
                  <Suspense fallback={null}>
                    <DevTools />
                  </Suspense>
                )}
              </div>
            </IonReactRouter>
          </IonApp>
        </Suspense>
      </div>
      <div className="desktop-footnote" aria-hidden="true">
        {t("auth.stage_footer")}
      </div>
    </div>
  );
}
