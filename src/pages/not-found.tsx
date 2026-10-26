import { useTranslation } from "react-i18next";
import { ActionLink } from "@src/components/ui/action-button";
import { Icon } from "@src/components/ui/icon";
import { AuthHeading } from "@src/components/auth/auth-heading";
import AuthFooter from "@src/components/auth/auth-footer";
import { PathNames } from "@src/constants/pathnames.const";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <main className="auth-screen not-found-screen">
      <div className="not-found-art" aria-hidden="true">
        <span>404</span>
        <Icon name="heart" />
      </div>
      <AuthHeading
        icon="info"
        eyebrow={t("not_found.eyebrow")}
        title={t("not_found.title")}
        description={t("not_found.description")}
      />
      <ActionLink to={PathNames.Login} replace>
        <Icon name="arrowBack" className="directional-icon" />
        {t("not_found.back_to_login")}
      </ActionLink>
      <AuthFooter />
    </main>
  );
}
