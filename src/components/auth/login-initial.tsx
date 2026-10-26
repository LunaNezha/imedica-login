import { useTranslation } from "react-i18next";
import { ActionLink } from "@src/components/ui/action-button";
import { Icon } from "@src/components/ui/icon";
import { PathNames } from "@src/constants/pathnames.const";
import CareVisual from "./care-visual";
import SocialButtons from "./social-buttons";
import AuthFooter from "./auth-footer";

export default function LoginInitial() {
  const { t } = useTranslation();
  return (
    <main className="auth-screen auth-welcome">
      <div className="welcome-badge">
        <span />
        {t("auth.welcome_badge")}
      </div>
      <CareVisual />
      <header className="welcome-heading">
        <p className="auth-eyebrow">{t("auth.welcome_eyebrow")}</p>
        <h1>
          {t("auth.welcome_title")}
          <br />
          <span>{t("auth.welcome_title_accent")}</span>
        </h1>
        <p className="auth-description">{t("auth.welcome_description")}</p>
      </header>
      <div className="auth-actions">
        <ActionLink to={PathNames.LoginWithUsername}>
          <span>{t("auth.sign_in")}</span>
          <Icon name="arrowForward" className="directional-icon" />
        </ActionLink>
        <ActionLink to={PathNames.LoginWithPhone} variant="secondary">
          <Icon name="phone" />
          {t("buttons.login_with_phone")}
        </ActionLink>
      </div>
      <SocialButtons />
      <AuthFooter />
    </main>
  );
}
