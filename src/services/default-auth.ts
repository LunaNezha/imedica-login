import { appConfig } from "@src/config/app-config";
import { AuthAdapter, AuthError } from "@src/types/auth";

export const defaultAuthAdapter: AuthAdapter = {
  async login(credentials, signal) {
    if (import.meta.env.DEV && appConfig.mockAuth) {
      const { demoAuth } = await import("@src/mocks/auth");
      return demoAuth.adapter.login(credentials, signal);
    }
    throw new AuthError("not_configured");
  },
  async logout(signal) {
    if (import.meta.env.DEV && appConfig.mockAuth) {
      const { demoAuth } = await import("@src/mocks/auth");
      await demoAuth.adapter.logout?.(signal);
    }
  },
};
