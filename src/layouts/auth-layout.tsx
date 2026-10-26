import { PropsWithChildren, useId, useRef } from "react";
import { IonMenuButton, IonPage, useIonViewWillEnter } from "@ionic/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Brand } from "@src/components/ui/brand";
import { Icon } from "@src/components/ui/icon";
import ThemeSwitcher from "@src/components/auth/theme-switcher";
import LanguageSwitcher from "@src/components/auth/language-switcher";
import { PathNames } from "@src/constants/pathnames.const";

export default function AuthLayout({
  children,
  welcome = false,
}: PropsWithChildren<{ welcome?: boolean }>) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentId = "auth-content-" + useId().replace(/:/g, "");
  useIonViewWillEnter(() => {
    if (containerRef.current) containerRef.current.scrollTop = 0;
  });
  return (
    <IonPage className="auth-page">
      <div ref={containerRef} className="auth-scroll-container">
        <a href={"#" + contentId} className="skip-link">
          {t("auth.skip_content")}
        </a>
        <header className="auth-topbar">
          <div className="auth-topbar-brand">
            {!welcome && (
              <Link
                className="icon-button back-button"
                to={PathNames.Login}
                aria-label={t("auth.back")}
              >
                <Icon name="arrowBack" className="directional-icon" />
              </Link>
            )}
            <Brand />
          </div>
          <div className="auth-topbar-actions">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <IonMenuButton
              menu="main-menu"
              className="auth-menu-button"
              aria-label={t("auth.open_menu")}
            >
              <Icon name="menu" />
            </IonMenuButton>
          </div>
        </header>
        <div id={contentId} tabIndex={-1}>
          {children}
        </div>
      </div>
    </IonPage>
  );
}
