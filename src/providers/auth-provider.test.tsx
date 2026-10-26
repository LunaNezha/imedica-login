// @vitest-environment jsdom
import { act } from "react";
import { createRoot, Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider, AuthProviderProps, useAuth } from "./auth-provider";
import { AuthAdapter, AuthUser } from "@src/types/auth";
import { createMockAuth } from "@src/mocks/auth";

let auth: ReturnType<typeof useAuth>;
let root: Root;
let container: HTMLDivElement;
function Consumer() {
  auth = useAuth();
  return <span>{auth.status}</span>;
}
async function mount(props: Omit<AuthProviderProps, "children">) {
  await act(async () =>
    root.render(
      <AuthProvider {...props}>
        <Consumer />
      </AuthProvider>,
    ),
  );
}
const credentials = {
  method: "password" as const,
  username: "demo@imedica.app",
  password: "Demo123!",
};

beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe("AuthProvider", () => {
  it("isolates rejected notification callbacks from successful authentication", async () => {
    const failure = new Error("Observer failed");
    const report = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    try {
      await mount({
        adapter: createMockAuth({ latencyMs: 0 }).adapter,
        onSuccess: () => Promise.reject(failure),
      });
      await act(async () => {
        await auth.login(credentials);
      });
      expect(auth.status).toBe("authenticated");
      expect(auth.error).toBeNull();
      expect(report).toHaveBeenCalledWith("Auth callback failed", failure);
    } finally {
      report.mockRestore();
    }
  });
  it("clears the local session even when remote logout fails", async () => {
    const adapter = createMockAuth({ latencyMs: 0 }).adapter;
    const onError = vi.fn();
    adapter.logout = async () => {
      throw new Error("Remote failure");
    };
    await mount({ adapter, onError });
    await act(async () => {
      await auth.login(credentials);
    });
    await act(async () => {
      await expect(auth.logout()).rejects.toThrow("Remote failure");
    });
    expect(auth.user).toBeNull();
    expect(auth.status).toBe("anonymous");
    expect(onError).toHaveBeenCalledOnce();
  });
  it("manages login/logout state and success/recovery callbacks", async () => {
    const onSuccess = vi.fn();
    const onForgotPassword = vi.fn();
    await mount({
      adapter: createMockAuth({ latencyMs: 0 }).adapter,
      onSuccess,
      onForgotPassword,
    });
    expect(auth.status).toBe("anonymous");
    let login!: Promise<AuthUser>;
    act(() => {
      login = auth.login(credentials);
    });
    expect(auth.status).toBe("authenticating");
    await act(async () => {
      await login;
    });
    expect(auth.status).toBe("authenticated");
    expect(onSuccess).toHaveBeenCalledWith(auth.user);
    await auth.forgotPassword?.();
    expect(onForgotPassword).toHaveBeenCalledOnce();
    await act(async () => {
      await auth.logout();
    });
    expect(auth.user).toBeNull();
    expect(auth.status).toBe("anonymous");
  });
  it("reports errors without creating sessions", async () => {
    const onError = vi.fn();
    await mount({ adapter: createMockAuth({ latencyMs: 0 }).adapter, onError });
    await act(async () => {
      await expect(
        auth.login({ ...credentials, password: "bad" }),
      ).rejects.toMatchObject({ code: "invalid_credentials" });
    });
    expect(auth.status).toBe("anonymous");
    expect(auth.user).toBeNull();
    expect(onError).toHaveBeenCalledOnce();
    expect(auth.error).toMatchObject({ code: "invalid_credentials" });
  });
  it("prevents stale login from restoring a session after logout even if an adapter ignores abort", async () => {
    let resolveLogin!: (user: AuthUser) => void;
    const adapter: AuthAdapter = {
      login: () =>
        new Promise((resolve) => {
          resolveLogin = resolve;
        }),
    };
    const onSuccess = vi.fn();
    await mount({ adapter, onSuccess });
    let login!: Promise<AuthUser>;
    act(() => {
      login = auth.login(credentials);
    });
    const rejection = expect(login).rejects.toMatchObject({
      name: "AbortError",
    });
    await act(async () => {
      await auth.logout();
    });
    await act(async () => {
      resolveLogin({ id: "stale", displayName: "Stale session" });
      await rejection;
    });
    expect(auth.user).toBeNull();
    expect(auth.status).toBe("anonymous");
    expect(onSuccess).not.toHaveBeenCalled();
  });
  it("cancels requests when unmounted", async () => {
    let signal!: AbortSignal;
    const adapter: AuthAdapter = {
      login: (_credentials, nextSignal) => {
        signal = nextSignal;
        return new Promise(() => undefined);
      },
    };
    await mount({ adapter });
    act(() => {
      void auth.login(credentials);
    });
    act(() => root.render(null));
    expect(signal.aborted).toBe(true);
  });
});
