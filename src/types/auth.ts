export type AuthCredentials =
  | { method: "password"; username: string; password: string }
  | { method: "phone"; phoneNumber: string; verifyCode: string };

export interface AuthUser {
  id: string;
  displayName: string;
}

export interface AuthAdapter {
  login(credentials: AuthCredentials, signal: AbortSignal): Promise<AuthUser>;
  logout?(signal: AbortSignal): Promise<void>;
}

export class AuthError extends Error {
  constructor(
    public readonly code:
      | "invalid_credentials"
      | "unavailable"
      | "not_configured",
  ) {
    super(code);
    this.name = "AuthError";
  }
}
