import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import secureLocalStorage from "react-secure-storage";
import { LANGUAGE } from "@src/constants/local-storage.const";
import en from "./locales/en/translations.json";
import fa from "./locales/fa/translations.json";
import ar from "./locales/ar/translations.json";
import { normalizeLanguage, supportedLanguages } from "./languages";
import { appConfig } from "@src/config/app-config";
import { updateDocumentMetadata } from "@src/utils/document-metadata";

const detector = new LanguageDetector();
detector.addDetector({
  name: "savedLanguage",
  lookup: () => {
    try {
      const saved = secureLocalStorage.getItem(LANGUAGE);
      return typeof saved === "string" ? normalizeLanguage(saved) : undefined;
    } catch {
      return undefined;
    }
  },
  cacheUserLanguage: (language) => {
    try {
      secureLocalStorage.setItem(LANGUAGE, language);
    } catch {
      // Language switching remains available when browser storage is blocked.
    }
  },
});

export function syncDocumentLanguage(language: string): void {
  const resolved = normalizeLanguage(language) ?? "en";
  const direction = i18n.dir(resolved);
  document.documentElement.lang = resolved;
  document.documentElement.dir = direction;
  document.body.dir = direction;
  updateDocumentMetadata(
    i18n.t("metadata.title", { lng: resolved }),
    i18n.t("metadata.description", { lng: resolved }),
  );
}

i18n.on("languageChanged", syncDocumentLanguage);

export const i18nReady = i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: en },
      fa: { translations: fa },
      ar: { translations: ar },
    },
    supportedLngs: [...supportedLanguages],
    load: "languageOnly",
    fallbackLng: appConfig.defaultLanguage,
    ns: ["translations"],
    defaultNS: "translations",
    detection: {
      order: ["savedLanguage", "navigator", "htmlTag"],
      caches: ["savedLanguage"],
    },
    interpolation: { escapeValue: false },
  });

if (import.meta.hot) {
  import.meta.hot.dispose(() =>
    i18n.off("languageChanged", syncDocumentLanguage),
  );
}

export default i18n;
