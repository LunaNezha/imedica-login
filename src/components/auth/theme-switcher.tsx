import { useTranslation } from "react-i18next";
import { useTheme } from "@src/providers/theme-provider";
import { Icon } from "@src/components/ui/icon";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  return (
    <button
      type="button"
      className="icon-button theme-switcher"
      aria-label={t("buttons.toggle_theme")}
      aria-pressed={theme === "dark"}
      onClick={toggleTheme}
    >
      <Icon name={theme === "dark" ? "moon" : "sun"} />
    </button>
  );
}
