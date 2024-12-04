import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import secureLocalStorage from "react-secure-storage";
import { LANGUAGE } from "./constants/local-storage.const";

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    lng: secureLocalStorage.getItem(LANGUAGE)
      ? String(secureLocalStorage.getItem(LANGUAGE))?.toLowerCase()
      : "en",
    fallbackLng: secureLocalStorage.getItem(LANGUAGE)
      ? String(secureLocalStorage.getItem(LANGUAGE))?.toLowerCase()
      : "en",
    defaultNS: "translation",
    backend: {
      loadPath: "/locales/{{lng}}/translations.json",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
