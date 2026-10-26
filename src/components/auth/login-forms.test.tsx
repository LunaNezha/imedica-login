// @vitest-environment jsdom
import { act } from "react";
import { Simulate } from "react-dom/test-utils";
import { createRoot, Root } from "react-dom/client";
import { createInstance } from "i18next";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { enqueueSnackbar } from "notistack";
import en from "@src/i18n/locales/en/translations.json";
import fa from "@src/i18n/locales/fa/translations.json";
import LoginWithPhone from "./login-with-phone";
import LoginWithUsername from "./login-with-username";

vi.mock("@src/providers/theme-provider", () => ({
  useTheme: () => ({ theme: "light" }),
}));
vi.mock("notistack", () => ({ enqueueSnackbar: vi.fn() }));

const translator = createInstance();
await translator.use(initReactI18next).init({
  lng: "en",
  defaultNS: "translations",
  resources: { en: { translations: en }, fa: { translations: fa } },
});

let container: HTMLDivElement;
let root: Root;

beforeEach(async () => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  vi.mocked(enqueueSnackbar).mockClear();
  await translator.changeLanguage("en");
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: false });
});

function changeInput(selector: string, value: string) {
  const input = container.querySelector<HTMLInputElement>(selector);
  if (!input) throw new Error("Input not found: " + selector);
  act(() => {
    input.value = value;
    Simulate.change(input);
  });
}

async function submit() {
  const form = container.querySelector("form");
  if (!form) throw new Error("Form not found");
  await act(async () => {
    Simulate.submit(form);
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

describe("login form integration", () => {
  it("toggles password visibility without clearing the password", async () => {
    await act(async () =>
      root.render(
        <MemoryRouter>
          <I18nextProvider i18n={translator}>
            <LoginWithUsername />
          </I18nextProvider>
        </MemoryRouter>,
      ),
    );
    changeInput('input[name="password"]', " keep spaces ");
    const toggle = container.querySelector<HTMLButtonElement>(
      'button[aria-label="Show password"]',
    );
    if (!toggle) throw new Error("Password toggle not found");
    act(() => Simulate.click(toggle));
    const input = container.querySelector<HTMLInputElement>(
      'input[name="password"]',
    );
    expect(input?.type).toBe("text");
    expect(input?.value).toBe(" keep spaces ");
    expect(toggle.getAttribute("aria-pressed")).toBe("true");
    act(() => Simulate.click(toggle));
    expect(input?.type).toBe("password");
  });

  it("clearly identifies social sign-in as a placeholder", async () => {
    await act(async () =>
      root.render(
        <MemoryRouter>
          <I18nextProvider i18n={translator}>
            <LoginWithUsername />
          </I18nextProvider>
        </MemoryRouter>,
      ),
    );
    const social = container.querySelector<HTMLButtonElement>(
      'button[aria-label="Continue with Google (preview)"]',
    );
    if (!social) throw new Error("Social button not found");
    act(() => Simulate.click(social));
    expect(enqueueSnackbar).toHaveBeenCalledWith(
      translator.t("auth.sso_placeholder", { provider: "Google" }),
      { variant: "info" },
    );
  });

  it("submits normalized phone and OTP values and disables controls while pending", async () => {
    let complete: () => void = () => undefined;
    const pending = new Promise<void>((resolve) => {
      complete = resolve;
    });
    const authenticate = vi.fn(() => pending);
    await act(async () =>
      root.render(
        <MemoryRouter>
          <I18nextProvider i18n={translator}>
            <LoginWithPhone onAuthenticate={authenticate} />
          </I18nextProvider>
        </MemoryRouter>,
      ),
    );
    changeInput('input[name="phoneNumber"]', "0912-222-3333");
    changeInput('input[autocomplete="one-time-code"]', "۰۱۲۳۴۵");
    await submit();
    expect(authenticate).toHaveBeenCalledWith({
      phoneNumber: "09122223333",
      verifyCode: "012345",
    });
    expect(
      container.querySelector<HTMLButtonElement>('button[type="submit"]')
        ?.disabled,
    ).toBe(true);
    await act(async () => complete());
    expect(enqueueSnackbar).toHaveBeenCalledWith(en.auth.sign_in_success, {
      variant: "success",
    });
    expect(
      container.querySelector<HTMLButtonElement>('button[type="submit"]')
        ?.disabled,
    ).toBe(false);
  });

  it("does not claim success when no authentication callback is configured", async () => {
    await act(async () =>
      root.render(
        <MemoryRouter>
          <I18nextProvider i18n={translator}>
            <LoginWithUsername />
          </I18nextProvider>
        </MemoryRouter>,
      ),
    );
    changeInput('input[name="username"]', "patient");
    changeInput('input[name="password"]', "patient-password");
    await submit();
    expect(enqueueSnackbar).toHaveBeenCalledWith(
      en.messages.authentication_not_configured,
      { variant: "info" },
    );
  });

  it("localizes submitted errors without clearing values", async () => {
    const authenticate = vi.fn();
    await act(async () =>
      root.render(
        <MemoryRouter>
          <I18nextProvider i18n={translator}>
            <LoginWithUsername onAuthenticate={authenticate} />
          </I18nextProvider>
        </MemoryRouter>,
      ),
    );
    changeInput('input[name="username"]', "   ");
    await submit();
    expect(authenticate).not.toHaveBeenCalled();
    expect(container.querySelector('[role="alert"]')?.textContent).toBe(
      en.validations.requireds.username,
    );
    await act(async () => {
      await translator.changeLanguage("fa");
    });
    expect(container.querySelector('[role="alert"]')?.textContent).toBe(
      fa.validations.requireds.username,
    );
    expect(
      container.querySelector<HTMLInputElement>('input[name="username"]')
        ?.value,
    ).toBe("   ");
  });

  it("handles rejected authentication callbacks without exposing server errors", async () => {
    const authenticate = vi
      .fn()
      .mockRejectedValue(new Error("Private server detail"));
    await act(async () =>
      root.render(
        <MemoryRouter>
          <I18nextProvider i18n={translator}>
            <LoginWithUsername onAuthenticate={authenticate} />
          </I18nextProvider>
        </MemoryRouter>,
      ),
    );
    changeInput('input[name="username"]', "  doctor  ");
    changeInput('input[name="password"]', "doctor-password");
    await submit();
    expect(authenticate).toHaveBeenCalledWith({
      username: "doctor",
      password: "doctor-password",
    });
    expect(enqueueSnackbar).toHaveBeenCalledWith(en.messages.operation_failed, {
      variant: "error",
    });
    expect(
      container.querySelector<HTMLButtonElement>('button[type="submit"]')
        ?.disabled,
    ).toBe(false);
  });
});
