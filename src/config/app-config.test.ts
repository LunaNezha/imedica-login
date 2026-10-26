import { describe, expect, it } from "vitest";
import { readAppConfig } from "./app-config";

describe("public configuration", () => {
  it("never enables mocks or DevTools in production", () => {
    const config = readAppConfig({
      ...import.meta.env,
      DEV: false,
      VITE_ENABLE_MOCK_AUTH: "true",
      VITE_ENABLE_DEVTOOLS: "true",
    });
    expect(config.mockAuth).toBe(false);
    expect(config.devTools).toBe(false);
  });
  it("supports disabling development features and normalizes language", () => {
    const config = readAppConfig({
      ...import.meta.env,
      DEV: true,
      VITE_ENABLE_MOCK_AUTH: "false",
      VITE_ENABLE_DEVTOOLS: "false",
      VITE_DEFAULT_LANGUAGE: "fa-IR",
      VITE_API_BASE_URL: " https://example.test/api ",
    });
    expect(config).toEqual({
      mockAuth: false,
      devTools: false,
      defaultLanguage: "fa",
      apiBaseUrl: "https://example.test/api",
    });
  });
  it("uses safe defaults", () => {
    expect(
      readAppConfig({
        ...import.meta.env,
        VITE_DEFAULT_LANGUAGE: "unsupported",
      }).defaultLanguage,
    ).toBe("en");
  });
});
