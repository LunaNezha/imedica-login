import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from "notistack";
import { ActionButton } from "@src/components/ui/action-button";
import { Icon } from "@src/components/ui/icon";

export default function SocialButtons({
  disabled = false,
}: {
  disabled?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <section className="social-section" aria-label={t("auth.social_label")}>
      <div className="auth-divider">
        <span />
        {t("auth.continue_with")}
        <span />
      </div>
      <div className="social-grid">
        {(["google", "apple"] as const).map((provider) => {
          const label = provider === "google" ? "Google" : "Apple";
          return (
            <ActionButton
              key={provider}
              variant="secondary"
              disabled={disabled}
              aria-label={t("auth.sso_action", { provider: label })}
              onClick={() =>
                enqueueSnackbar(
                  t("auth.sso_placeholder", { provider: label }),
                  { variant: "info" },
                )
              }
            >
              <Icon name={provider} />
              <span dir="ltr">{label}</span>
            </ActionButton>
          );
        })}
      </div>
      <p className="social-note">{t("auth.sso_note")}</p>
    </section>
  );
}
