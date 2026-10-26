import { IonContent, IonMenu, IonMenuToggle } from "@ionic/react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Brand } from "@src/components/ui/brand";
import { Icon, IconName } from "@src/components/ui/icon";
import { PathNames } from "@src/constants/pathnames.const";
import { useTheme } from "@src/providers/theme-provider";
import LanguageSwitcher from "./language-switcher";
import ThemeSwitcher from "./theme-switcher";
import { useOptionalAuth } from "@src/providers/auth-provider";
import { enqueueSnackbar } from "notistack";

export default function Menu() {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const auth = useOptionalAuth();
  const { pathname } = useLocation();
  const [isMenuReady, setMenuReady] = useState(false);
  const direction = i18n.dir();
  const links: Array<{ title: string; path: string; icon: IconName }> = [
    { title: t("auth.drawer_welcome"), path: PathNames.Login, icon: "heart" },
    {
      title: t("auth.sign_in"),
      path: PathNames.LoginWithUsername,
      icon: "user",
    },
    {
      title: t("buttons.login_with_phone"),
      path: PathNames.LoginWithPhone,
      icon: "phone",
    },
  ];
  // Remounting refreshes Ionic's cached gesture direction after RTL/LTR changes.
  return (
    <IonMenu
      key={direction}
      className="im-drawer"
      id="menu"
      menuId="main-menu"
      contentId="app-content"
      side="start"
      dir={direction}
      type="overlay"
      swipeGesture
      onIonDidOpen={() => setMenuReady(true)}
      onIonWillClose={() => setMenuReady(false)}
    >
      <IonContent className="drawer-content">
        <div className="drawer-inner">
          <div className="drawer-header">
            <Brand />
            <IonMenuToggle menu="main-menu">
              <button
                type="button"
                disabled={!isMenuReady}
                className="icon-button"
                aria-label={t("auth.close_menu")}
              >
                <Icon name="close" />
              </button>
            </IonMenuToggle>
          </div>
          <div className="drawer-intro">
            <span className="auth-eyebrow">{t("auth.drawer_eyebrow")}</span>
            <h2>{t("auth.drawer_title")}</h2>
            <p>{t("auth.drawer_description")}</p>
          </div>
          <nav className="drawer-nav" aria-label={t("auth.navigation")}>
            {links.map((link) => (
              <IonMenuToggle key={link.path} menu="main-menu">
                <Link
                  to={link.path}
                  className="drawer-link"
                  aria-current={pathname === link.path ? "page" : undefined}
                >
                  <Icon name={link.icon} />
                  <span>{link.title}</span>
                  <Icon name="chevron" className="directional-icon" />
                </Link>
              </IonMenuToggle>
            ))}
          </nav>
          {auth?.user && (
            <section className="drawer-section">
              <h3>{t("session.signed_in")}</h3>
              <p>{auth.user.displayName}</p>
              <button
                type="button"
                className="drawer-link"
                disabled={auth.status === "signing-out"}
                onClick={async () => {
                  try {
                    await auth.logout();
                  } catch {
                    enqueueSnackbar(t("messages.operation_failed"), {
                      variant: "error",
                    });
                  }
                }}
              >
                {t("session.logout")}
              </button>
            </section>
          )}
          <section className="drawer-section">
            <h3>{t("auth.appearance")}</h3>
            <div className="drawer-setting">
              <span>
                <strong>{t("auth.theme")}</strong>
                <small>
                  {t(theme === "dark" ? "auth.dark_mode" : "auth.light_mode")}
                </small>
              </span>
              <ThemeSwitcher />
            </div>
          </section>
          <section className="drawer-section">
            <h3>{t("choose_lang.header")}</h3>
            <LanguageSwitcher inline disabled={!isMenuReady} />
          </section>
          <section className="drawer-project">
            <span className="drawer-project-icon">
              <Icon name="info" />
            </span>
            <h3>{t("auth.project_info")}</h3>
            <p>{t("auth.project_description")}</p>
            <div>
              <span>{t("globals.version")}</span>
              <strong dir="ltr">{__APP_VERSION__}</strong>
            </div>
            <small dir="ltr">Ionic · React · TypeScript</small>
          </section>
          <p className="drawer-footer">
            <Icon name="leaf" />
            {t("auth.footer_note")}
          </p>
        </div>
      </IonContent>
    </IonMenu>
  );
}
