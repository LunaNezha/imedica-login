import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@src/providers/theme-provider";
import { useAuth } from "@src/providers/auth-provider";
import { demoAuth, MockScenario } from "@src/mocks/auth";
import { appConfig } from "@src/config/app-config";
import "./dev-tools.css";

export default function DevTools() {
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { status } = useAuth();
  const [scenario, setScenario] = useState<MockScenario>("success");
  return (
    <details className="dev-tools" dir="ltr">
      <summary>DevTools</summary>
      <section aria-label="Development controls">
        <strong>Local preview only</strong>
        <output aria-live="polite">Auth: {status}</output>
        <label>
          Language / direction
          <select
            value={i18n.resolvedLanguage}
            onChange={async (event) => {
              const language = event.target.value;
              const menu = document.getElementById(
                "menu",
              ) as HTMLIonMenuElement | null;
              if (menu && (await menu.isOpen())) {
                if (!(await menu.close())) return;
              }
              await i18n.changeLanguage(language);
            }}
          >
            <option value="en">EN · LTR</option>
            <option value="fa">FA · RTL</option>
            <option value="ar">AR · RTL</option>
          </select>
        </label>
        <button type="button" onClick={toggleTheme}>
          Theme: {theme}
        </button>
        <label>
          Mock response
          <select
            disabled={!appConfig.mockAuth}
            value={scenario}
            onChange={(event) => {
              const next = event.target.value as MockScenario;
              demoAuth.setScenario(next);
              setScenario(next);
            }}
          >
            <option value="success">Check demo credentials</option>
            <option value="invalid_credentials">Invalid credentials</option>
            <option value="unavailable">Service unavailable</option>
          </select>
        </label>
        <div className="dev-tools-actions">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("imedica:validate"))}
          >
            Show form errors
          </button>
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new Event("imedica:clear-errors"))
            }
          >
            Clear errors
          </button>
        </div>
        {appConfig.mockAuth && (
          <small>
            Demo: {demoAuth.credentials.username} /{" "}
            {demoAuth.credentials.password}
            <br />
            Phone: {demoAuth.credentials.phoneNumber} · OTP:{" "}
            {demoAuth.credentials.verifyCode}
          </small>
        )}
      </section>
    </details>
  );
}
