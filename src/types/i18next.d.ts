import "i18next";
import translations from "@src/i18n/locales/en/translations.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translations";
    resources: { translations: typeof translations };
  }
}
