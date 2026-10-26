import { describe, expect, it } from "vitest";
import { createMockAuth } from "./auth";

describe("mock authentication", () => {
  it("accepts configured credentials for both methods, preserving OTP zeroes", async () => {
    const mock = createMockAuth({
      username: "doctor",
      password: " spaces ",
      latencyMs: 0,
    });
    const signal = new AbortController().signal;
    await expect(
      mock.adapter.login(
        { method: "password", username: "doctor", password: " spaces " },
        signal,
      ),
    ).resolves.toMatchObject({ id: "demo-patient" });
    await expect(
      mock.adapter.login(
        {
          method: "phone",
          phoneNumber: mock.credentials.phoneNumber,
          verifyCode: "012345",
        },
        signal,
      ),
    ).resolves.toMatchObject({ id: "demo-patient" });
    await expect(mock.adapter.logout?.(signal)).resolves.toBeUndefined();
  });
  it("rejects invalid credentials and forced failure scenarios", async () => {
    const mock = createMockAuth({ latencyMs: 0 });
    const credentials = {
      method: "password" as const,
      username: mock.credentials.username,
      password: mock.credentials.password,
    };
    await expect(
      mock.adapter.login(
        { ...credentials, password: "wrong" },
        new AbortController().signal,
      ),
    ).rejects.toMatchObject({ code: "invalid_credentials" });
    mock.setScenario("unavailable");
    expect(() => mock.handlers.login(credentials)).toThrow("unavailable");
    mock.setScenario("success");
    expect(mock.handlers.login(credentials).displayName).toBe("Demo Patient");
  });
  it("aborts pending and already-aborted requests", async () => {
    const mock = createMockAuth({ latencyMs: 10000 });
    const controller = new AbortController();
    const credentials = {
      method: "phone" as const,
      phoneNumber: "09122223333",
      verifyCode: "012345",
    };
    const pending = mock.adapter.login(credentials, controller.signal);
    controller.abort();
    await expect(pending).rejects.toMatchObject({ name: "AbortError" });
    await expect(
      mock.adapter.login(credentials, controller.signal),
    ).rejects.toMatchObject({ name: "AbortError" });
  });
});
