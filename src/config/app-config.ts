import { normalizeLanguage } from "@src/i18n/languages";

export function readAppConfig(env: ImportMetaEnv) {
  return {
    apiBaseUrl: env.VITE_API_BASE_URL?.trim() || "/api",
    defaultLanguage:
      normalizeLanguage(env.VITE_DEFAULT_LANGUAGE ?? "en") ?? "en",
    mockAuth: env.DEV && env.VITE_ENABLE_MOCK_AUTH !== "false",
    devTools: env.DEV && env.VITE_ENABLE_DEVTOOLS !== "false",
  };
}

export const appConfig = readAppConfig(import.meta.env);
