import { useTranslation } from "react-i18next";
import { Icon } from "@src/components/ui/icon";

export default function AuthFooter() {
  const { t } = useTranslation();
  return (
    <footer className="auth-footer">
      <p>
        <Icon name="leaf" />
        {t("auth.footer_note")}
      </p>
      <span>
        iMedica · {t("globals.version")} {__APP_VERSION__}
      </span>
    </footer>
  );
}
