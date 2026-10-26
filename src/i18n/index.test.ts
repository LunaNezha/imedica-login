// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import secureLocalStorage from "react-secure-storage";
import { LANGUAGE } from "@src/constants/local-storage.const";
import i18n, { i18nReady } from "./index";
import { normalizeLanguage } from "./languages";

vi.mock("react-secure-storage", () => ({
  default: {
    getItem: (key: string) => localStorage.getItem(key),
    setItem: (key: string, value: string) => localStorage.setItem(key, value),
  },
}));

beforeEach(async () => {
  await i18nReady;
  await i18n.changeLanguage("en");
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("language configuration", () => {
  it.each([
    ["en", "ltr"],
    ["fa", "rtl"],
    ["ar", "rtl"],
    ["en", "ltr"],
  ])(
    "synchronizes document attributes and persistence for %s",
    async (language, direction) => {
      await i18n.changeLanguage(language);
      expect(document.documentElement.lang).toBe(language);
      expect(document.documentElement.dir).toBe(direction);
      expect(document.body.dir).toBe(direction);
      expect(document.title).toBe(i18n.t("metadata.title"));
      expect(secureLocalStorage.getItem(LANGUAGE)).toBe(language);
    },
  );

  it("normalizes regional language preferences", () => {
    expect(normalizeLanguage("FA-IR")).toBe("fa");
    expect(normalizeLanguage("ar_SA")).toBe("ar");
    expect(normalizeLanguage("en-US")).toBe("en");
    expect(normalizeLanguage("unknown")).toBeUndefined();
  });

  it("falls back to English for untranslated Arabic keys", async () => {
    await i18n.changeLanguage("ar");
    expect(i18n.t("globals.sorting")).toBe("Sorting");
    expect(i18n.t("buttons.login")).toBe("تسجيل الدخول");
  });

  it("switches languages when storage is blocked", async () => {
    vi.spyOn(secureLocalStorage, "setItem").mockImplementation(() => {
      throw new Error("Storage blocked");
    });
    await i18n.changeLanguage("fa");
    expect(document.documentElement.dir).toBe("rtl");
  });
});
