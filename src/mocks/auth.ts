import {
  AuthAdapter,
  AuthCredentials,
  AuthError,
  AuthUser,
} from "@src/types/auth";

export type MockScenario = "success" | "invalid_credentials" | "unavailable";
export interface MockAuthOptions {
  username?: string;
  password?: string;
  phoneNumber?: string;
  verifyCode?: string;
  latencyMs?: number;
  user?: AuthUser;
}

export function createMockAuth(options: MockAuthOptions = {}) {
  const credentials = {
    username: options.username ?? "demo@imedica.app",
    password: options.password ?? "Demo123!",
    phoneNumber: options.phoneNumber ?? "09122223333",
    verifyCode: options.verifyCode ?? "012345",
  };
  const user = options.user ?? {
    id: "demo-patient",
    displayName: "Demo Patient",
  };
  let scenario: MockScenario = "success";
  const handlers = {
    login(input: AuthCredentials): AuthUser {
      if (scenario !== "success") throw new AuthError(scenario);
      const valid =
        input.method === "password"
          ? input.username === credentials.username &&
            input.password === credentials.password
          : input.phoneNumber === credentials.phoneNumber &&
            input.verifyCode === credentials.verifyCode;
      if (!valid) throw new AuthError("invalid_credentials");
      return { ...user };
    },
    logout(): void {},
  };
  const wait = (signal: AbortSignal) =>
    new Promise<void>((resolve, reject) => {
      const abort = () => {
        clearTimeout(timer);
        reject(new DOMException("Request cancelled", "AbortError"));
      };
      const timer = setTimeout(
        () => {
          signal.removeEventListener("abort", abort);
          resolve();
        },
        Math.max(0, options.latencyMs ?? 650),
      );
      if (signal.aborted) abort();
      else signal.addEventListener("abort", abort, { once: true });
    });
  const adapter: AuthAdapter = {
    async login(input, signal) {
      await wait(signal);
      return handlers.login(input);
    },
    async logout(signal) {
      await wait(signal);
      handlers.logout();
    },
  };
  return {
    adapter,
    handlers,
    credentials,
    setScenario: (next: MockScenario) => {
      scenario = next;
    },
  };
}

const latency = Number(import.meta.env.VITE_MOCK_LATENCY_MS ?? 650);
export const demoAuth = createMockAuth({
  username: import.meta.env.VITE_MOCK_USERNAME,
  password: import.meta.env.VITE_MOCK_PASSWORD,
  phoneNumber: import.meta.env.VITE_MOCK_PHONE,
  verifyCode: import.meta.env.VITE_MOCK_OTP,
  latencyMs: Number.isFinite(latency) ? latency : 650,
});
