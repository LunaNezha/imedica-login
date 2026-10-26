import { IonAlert } from "@ionic/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from "notistack";
import { languageOptions, normalizeLanguage } from "@src/i18n/languages";
import IranFlag from "@assets/images/iran.png";
import UnitedStatesFlag from "@assets/images/united-states.png";

function LanguageBadge({ code }: { code: string }) {
  const flag =
    code === "fa" ? IranFlag : code === "en" ? UnitedStatesFlag : undefined;
  return (
    <span className="language-badge" dir="ltr">
      {flag && <img src={flag} alt="" width="16" height="16" />}
      <span>{code.toUpperCase()}</span>
    </span>
  );
}

export default function LanguageSwitcher({
  inline = false,
  disabled = false,
}: {
  inline?: boolean;
  disabled?: boolean;
}) {
  const [isAlertOpen, setAlertOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const language =
    normalizeLanguage(i18n.resolvedLanguage ?? i18n.language) ?? "en";
  const changeLanguage = async (nextLanguage: string) => {
    try {
      if (inline) {
        // Release Ionic's content pointer lock before the direction remount.
        const menu = document.getElementById(
          "menu",
        ) as HTMLIonMenuElement | null;
        await menu?.close();
      }
      await i18n.changeLanguage(nextLanguage);
      setAlertOpen(false);
    } catch {
      enqueueSnackbar(t("messages.operation_failed"), { variant: "error" });
    }
  };
  if (inline)
    return (
      <div
        className="language-options"
        role="group"
        aria-busy={disabled}
        aria-label={t("choose_lang.header")}
      >
        {languageOptions.map(({ code, label }) => (
          <button
            key={code}
            type="button"
            disabled={disabled}
            className="language-option"
            aria-pressed={language === code}
            onClick={() => {
              void changeLanguage(code);
            }}
          >
            <LanguageBadge code={code} />
            <span lang={code}>{label}</span>
          </button>
        ))}
      </div>
    );
  return (
    <>
      <button
        type="button"
        disabled={disabled}
        className="icon-button language-trigger"
        aria-label={t("choose_lang.header")}
        onClick={() => setAlertOpen(true)}
      >
        <LanguageBadge code={language} />
      </button>
      <IonAlert
        isOpen={isAlertOpen}
        onDidDismiss={() => setAlertOpen(false)}
        header={t("choose_lang.header")}
        buttons={[{ text: t("buttons.cancel"), role: "cancel" }]}
        inputs={languageOptions.map(({ code, label }) => ({
          label,
          type: "radio" as const,
          value: code,
          checked: language === code,
          handler: () => {
            void changeLanguage(code);
          },
        }))}
      />
    </>
  );
}
