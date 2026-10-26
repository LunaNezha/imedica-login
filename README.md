# iMedica Login

![Build: CI not configured](https://img.shields.io/badge/build-CI_not_configured-lightgrey)
![License: file pending](https://img.shields.io/badge/license-file_pending-yellow)
![Ionic React 8](https://img.shields.io/badge/Ionic-8-3880FF?logo=ionic&logoColor=white)
![React 18](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)
![Tailwind CSS 3](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![i18next: EN, FA, AR](https://img.shields.io/badge/i18next-EN_%7C_FA_%7C_AR-26A69A?logo=i18next&logoColor=white)

**A mobile-first authentication starter for Ionic React, with polished themes, multilingual layouts, and replaceable auth logic.**

Build your sign-in experience without starting from a blank screen. iMedica Login combines username/password and phone/OTP forms, automatic RTL/LTR switching, and a native-feeling settings drawer in a customizable TypeScript project.

> This is an authentication **UI and integration starter**, not an identity service. Local demo authentication is included; production requires your own backend adapter.

[Quick start](#quick-start) · [Demo & previews](#demo--previews) · [Integration](#integrate-into-an-ionic-react-app) · [Customization](#customization) · [Project structure](#project-structure)

## Highlights

| Feature                  | What you get                                                                                    |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| Mobile-first layout      | Full-screen mobile pages, safe-area spacing, and a centered device frame on desktop.            |
| Multilingual by default  | English, Persian, and Arabic resources, language detection, and persisted preferences.          |
| Automatic RTL/LTR        | Document direction, directional icons, and Ionic drawer alignment follow the selected language. |
| Ready-to-use validation  | React Hook Form + Zod, localized errors, masked phone input, and six-digit OTP handling.        |
| Light and dark themes    | Shared Tailwind and Ionic CSS variables, persisted appearance, and subtle transitions.          |
| Reusable auth components | Floating-label inputs, password visibility, loading buttons, and toast feedback.                |
| Native-feeling drawer    | Ionic swipe gestures, theme controls, language badges, and project information.                 |
| Replaceable auth logic   | Typed `AuthProvider` / `useAuth`, optional per-form callbacks, and configurable mock handlers.  |
| Developer controls       | Development-only theme, language, mock-failure, and validation controls.                        |

Google/Apple sign-in buttons are clearly marked previews. Password recovery shows informational feedback unless you supply a callback. No SMS is sent by the demo.

## Demo & Previews

**Hosted demo:** Coming soon. Until a deployment URL is added, follow [Quick start](#quick-start) to try the interactive demo locally.

<!-- Maintainer: replace this note with a verified hosted demo link after deployment. -->

Try these flows:

1. Choose username/password or phone/OTP sign-in.
2. Open the drawer and switch between light and dark themes.
3. Select English, Persian, or Arabic to compare LTR and RTL layouts.
4. Open **DevTools** to simulate failed requests or show validation errors.

### Media Placeholders

The following slots are intentionally placeholders, not broken image links. Add recordings or screenshots under `docs/media/` when ready.

| Preview                 | Suggested asset                             | What to demonstrate                                           |
| ----------------------- | ------------------------------------------- | ------------------------------------------------------------- |
| Guided walkthrough      | `docs/media/auth-walkthrough.gif` or `.mp4` | Sign-in, loading feedback, validation, and drawer navigation. |
| Light / dark comparison | `docs/media/themes.png`                     | The same form in both themes.                                 |
| LTR / RTL comparison    | `docs/media/languages.png`                  | English alongside Persian or Arabic.                          |
| Drawer navigation       | `docs/media/drawer.gif`                     | Swipe-to-open, language selection, and appearance controls.   |

<!-- Enable these embeds after adding the assets:
![Authentication walkthrough](docs/media/auth-walkthrough.gif)
![Light and dark authentication themes](docs/media/themes.png)
![English LTR and Persian RTL layouts](docs/media/languages.png)
![Settings drawer navigation](docs/media/drawer.gif)
-->

## Quick Start

### 1. Clone and install

Use Node.js and npm compatible with the Vite 5 toolchain. The project has been exercised locally with Node.js 22; no Node version is currently pinned in the repository. Ionic CLI is not required for the web demo.

```bash
git clone https://github.com/LunaNezha/imedica-login.git
cd imedica-login
npm install
```

For reproducible installations using the committed lockfile, use `npm ci` instead of `npm install`.

### 2. Configure the environment

```bash
cp .env.example .env.local
```

On Windows, copy `.env.example` to `.env.local` using your editor or file manager. Default values are sufficient for the local demo.

### 3. Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite, then visit `/login`. Resize the browser to compare the mobile layout and desktop frame.

### 4. Sign in with demo credentials

| Method            | Identifier         | Password / code |
| ----------------- | ------------------ | --------------- |
| Username/password | `demo@imedica.app` | `Demo123!`      |
| Phone/OTP         | `09122223333`      | `012345`        |

These are **public dummy credentials**, not real accounts. Successful demo authentication stays in memory and resets on reload. Open the drawer after signing in to see the demo user and sign out.

> Mock authentication and DevTools are development-only. `npm run preview` serves a production build, where both are disabled—even when their environment flags are `true`.

## Environment Variables

Vite reads these settings at startup/build time. Restart the development server after editing `.env.local`; rebuild production bundles after changing deployment configuration.

| Variable                | Default               | Purpose                                                                                                                      |
| ----------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `VITE_API_BASE_URL`     | `/api`                | Public endpoint exposed through `appConfig.apiBaseUrl` for your adapter to use. It does not connect a backend automatically. |
| `VITE_DEFAULT_LANGUAGE` | `en`                  | Fallback language: `en`, `fa`, or `ar`. Saved and detected supported languages take priority.                                |
| `VITE_ENABLE_MOCK_AUTH` | `true` in development | Enable local simulated authentication. Set to `false` when connecting your backend.                                          |
| `VITE_ENABLE_DEVTOOLS`  | `true` in development | Show the floating developer controls.                                                                                        |
| `VITE_MOCK_USERNAME`    | `demo@imedica.app`    | Demo username.                                                                                                               |
| `VITE_MOCK_PASSWORD`    | `Demo123!`            | Demo password.                                                                                                               |
| `VITE_MOCK_PHONE`       | `09122223333`         | Demo phone number.                                                                                                           |
| `VITE_MOCK_OTP`         | `012345`              | Demo verification code; preserve the leading zero.                                                                           |
| `VITE_MOCK_LATENCY_MS`  | `650`                 | Simulated request delay in milliseconds.                                                                                     |
| `VITE_LEGACY_BUILD`     | `false`               | Opt into additional legacy-browser bundles. Test against your target browser/WebView versions.                               |

**All `VITE_*` values are public and may be embedded in client bundles. Never put real passwords, private API keys, or signing secrets in them.**

## Integrate into an Ionic React App

### Choose your starting point

- **New application:** Use this repository as a starter and replace the default auth adapter in `src/Main.tsx`.
- **Existing application:** Copy and adapt the required source modules. This repository is marked `private` in `package.json`; it does not currently expose an installable `LoginModule` package.
- **Only need a form?** Use `LoginWithUsername` or `LoginWithPhone` with an `onAuthenticate` callback inside your own page shell.

### Prepare an existing application

1. Match the project's major versions: React 18, Ionic React 8, React Router 5, and Tailwind CSS 3. The routing example below uses React Router 5 APIs.
2. Copy the relevant components and their supporting `layouts`, `providers`, `i18n`, `theme`, `types`, `utils`, `constants`, `config`, and `assets` modules. Include `services` and `mocks` if you retain the default demo adapter or DevTools. Follow source imports rather than copying a single form file in isolation.
3. Install the imported dependencies. Start with `package.json`; the forms use `react-hook-form`, `@hookform/resolvers`, `zod`, `@react-input/mask`, `react-i18next`, and `notistack`, alongside the Ionic, styling, and language dependencies.
4. Merge the Vite and TypeScript aliases: `@src` → your `src` directory; `@assets` → `src/assets`; `@public` → `public`. Merge the declarations in `src/vite-env.d.ts`, including the `__APP_VERSION__` build constant used by the drawer.
5. Import `src/theme/globals.css` once and merge `src/theme/tailwind.preset.js` into your Tailwind configuration. Include copied components in Tailwind's `content` paths.
6. Initialize Ionic once with `setupIonicReact()`. Await the exported `i18nReady` promise before the first render, as shown in `src/Main.tsx`.

Do not overwrite your application's entry point or create a second `IonApp` / router. Merge the providers and routes into the existing shell.

### Compose `AuthLayout` with your routes

This example goes **inside your existing `IonApp` and `IonReactRouter`**. It uses the actual `AuthLayout` export and keeps all three routes so the built-in navigation links work.

```tsx
import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import Login from "@src/components/auth/login-initial";
import LoginWithPhone from "@src/components/auth/login-with-phone";
import LoginWithUsername from "@src/components/auth/login-with-username";
import Menu from "@src/components/auth/menu";
import i18n from "@src/i18n";
import AuthLayout from "@src/layouts/auth-layout";
import { AuthProvider } from "@src/providers/auth-provider";
import { ThemeProvider } from "@src/providers/theme-provider";
import ToastProvider from "@src/providers/toast-provider";
import type { AuthAdapter } from "@src/types/auth";

export function AuthenticationRoutes({ adapter }: { adapter: AuthAdapter }) {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider initialTheme="light">
        <ToastProvider>
          <AuthProvider adapter={adapter}>
            <Menu />
            <div id="app-content" className="app-content">
              <IonRouterOutlet>
                <Route
                  exact
                  path="/login"
                  render={() => (
                    <AuthLayout welcome>
                      <Login />
                    </AuthLayout>
                  )}
                />
                <Route
                  exact
                  path="/login/username"
                  render={() => (
                    <AuthLayout>
                      <LoginWithUsername />
                    </AuthLayout>
                  )}
                />
                <Route
                  exact
                  path="/login/phone"
                  render={() => (
                    <AuthLayout>
                      <LoginWithPhone />
                    </AuthLayout>
                  )}
                />
              </IonRouterOutlet>
            </div>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}
```

Reuse existing providers instead of nesting duplicates. Merge the routes into your existing outlet if appropriate. The drawer targets `app-content` and uses `main-menu` / `menu` identifiers; update the related references together if your app already uses those IDs. The desktop device frame is composed separately in `src/App.tsx`—`AuthLayout` alone does not add it.

### Connect real authentication

Provide a stable `AuthAdapter` with a `login(credentials, signal)` method returning `Promise<{ id: string; displayName: string }>`, plus an optional `logout(signal)` method. Credentials are discriminated by `method: "password" | "phone"`; see `src/types/auth.ts` for the complete contract. Perform requests and validate server responses inside your adapter, forwarding the `AbortSignal`.

`AuthProvider` supports `onSuccess(user)`, `onError(error)`, and `onForgotPassword()` callbacks. `useAuth()` exposes `user`, `status`, `error`, `login`, `logout`, and optional `forgotPassword`; call it inside the provider.

For a standalone form, pass callbacks directly:

```tsx
import LoginWithUsername from "@src/components/auth/login-with-username";
import type { LoginWithUsernameFormValues } from "@src/types/auth.type";

type Props = {
  signIn: (values: LoginWithUsernameFormValues) => Promise<void>;
  openRecovery: () => void;
};

export function SignInForm({ signIn, openRecovery }: Props) {
  return (
    <LoginWithUsername
      onAuthenticate={signIn}
      onForgotPassword={openRecovery}
    />
  );
}
```

The form still needs the shared styles, translation/theme/toast providers, and router, but it does not require `AuthProvider` when an authentication callback is supplied. `onAuthenticate` takes precedence over provider login; manage your own session state in that callback. Resolve only after successful authentication and reject failures to show localized feedback.

**Production responsibilities:** Implement backend authorization, secure session handling, session restoration, route guards, SMS delivery, SSO, and account recovery in your application. The included provider does not persist sessions or issue tokens. Logout clears local state immediately; a failed remote logout does not guarantee server-side session revocation.

## Customization

### Branding and sharing metadata

Edit `index.html` for the initial page title, description, author, and Open Graph/Twitter metadata. Runtime titles and descriptions are translated through the `metadata` keys in `src/i18n/locales/`. Theme-color tags follow both the initial system preference and the app's explicit theme selection.

Set optional `VITE_SITE_URL` in `.env.local` to your public application root (for example, `https://example.com/imedica/`). Vite adds the canonical URL and `og:url`, and makes social-image URLs absolute. Leave it blank for local development; no production domain is assumed. Keep this URL aligned with your Vite `base` when deploying under a subdirectory.

SVG branding sources live in `src/assets/branding/`. After editing them, run:

```bash
npm run generate:icons
```

This generates the SVG/PNG favicons, 180px Apple touch icon, 192px/512px app icons, a separate opaque maskable icon, and the 1200×630 social preview in `public/branding/`. Generated files are committed and served without runtime image processing. Review `public/manifest.json` when changing the app name or entry route. The manifest does not add a service worker or offline support by itself.

Unknown URLs render a lightweight translated 404 screen with a **Back to Login** action. The pathless Ionic fallback stays last so it cannot override valid authentication routes. Production hosts must serve the SPA entry for client-side routes; the client-rendered 404 view does not itself set an HTTP 404 response status.

### Add a language

1. Create `src/i18n/locales/<code>/translations.json`, using the English resource as the key reference.
2. Add the code to `supportedLanguages` and a display label to `languageOptions` in `src/i18n/languages.ts`.
3. Import the resource in `src/i18n/index.ts` and register it under the existing `translations` namespace:

   ```ts
   import de from "./locales/de/translations.json";

   const resources = {
     en: { translations: en },
     fa: { translations: fa },
     ar: { translations: ar },
     de: { translations: de },
   };
   ```

   Pass the updated `resources` object to the existing `.init()` call; keep its other options unchanged.

4. Translate the authentication and validation keys. If introducing new keys, add them to the English resource too; `src/types/i18next.d.ts` derives its key types from that file.
5. Test labels, errors, text expansion, direction, and drawer gestures. Extend the optional DevTools language list if you want the new locale there as well.

Language detection checks the saved preference, browser language, then HTML language. Regional variants such as `fa-IR` normalize to their supported base code. The configured fallback is English unless changed through `VITE_DEFAULT_LANGUAGE`; Arabic currently focuses on the authentication UI, so some non-authentication keys use the fallback.

The shared i18n listener updates document language and direction using `i18n.dir()`. The drawer uses logical `side="start"` and refreshes on direction changes. Use `LanguageSwitcher` for drawer selection: it closes the menu before changing language to avoid leaving Ionic's content interaction lock active.

### Adjust colors, typography, and layout

| Change                                   | Edit                                                                    |
| ---------------------------------------- | ----------------------------------------------------------------------- |
| Light/dark colors and Ionic appearance   | `src/theme/variables.css` (`--im-*` and `--ion-*` tokens)               |
| Shared component styles and device frame | `src/theme/globals.css`                                                 |
| Tailwind design tokens                   | `src/theme/tailwind.preset.js`                                          |
| Fonts                                    | `src/assets/styles/font-families.css` and `src/assets/fonts/`           |
| Brand and decorative visuals             | `src/components/ui/brand.tsx` and `src/components/auth/care-visual.tsx` |
| Form fields and validation               | `src/components/auth/` and `src/utils/schemas/auth-schemas.ts`          |
| Demo credentials and scenarios           | `.env.local` and `src/mocks/auth.ts`                                    |

The phone schema currently expects an Iranian mobile number starting with `09`. It normalizes Persian/Arabic digits and mask separators, and preserves leading OTP zeroes. Changing interface language does not change the phone-number policy; extend the schema for additional regions. Password values are passed unchanged, without signup-style strength rules.

## Project Structure

```text
imedica-login/
├── src/
│   ├── components/
│   │   ├── ui/                # Buttons, icons, inputs, OTP, and overlays
│   │   ├── auth/              # Sign-in forms, selectors, drawer, and submit hooks
│   │   └── dev/               # Development-only controls
│   ├── config/                # Public environment configuration
│   ├── i18n/
│   │   ├── index.ts           # Initialization, detection, and direction sync
│   │   ├── languages.ts       # Supported language codes and labels
│   │   └── locales/           # en/, fa/, and ar/ translation resources
│   ├── layouts/               # Ionic authentication and main page shells
│   ├── providers/             # Auth, theme, and toast contexts
│   ├── services/              # Default adapter integration boundary
│   ├── mocks/                 # Demo adapter, handlers, and failure scenarios
│   ├── theme/                 # Tailwind preset, global styles, and Ionic tokens
│   ├── types/                 # Auth contracts and shared TypeScript types
│   ├── utils/                 # Validation schemas, digit helpers, and utilities
│   ├── constants/             # Route names and shared constants
│   ├── assets/                # Fonts, images, and font declarations
│   ├── pages/                 # Welcome, loading, and not-found pages
│   ├── routes/                # Route declarations and Ionic outlet
│   ├── App.tsx                # App shell and desktop device frame
│   └── Main.tsx               # Bootstrap, i18n readiness, and providers
├── cypress/e2e/               # Development flows and production smoke test
├── .env.example               # Documented public configuration defaults
├── tailwind.config.js         # Tailwind content paths and preset registration
└── vite.config.ts             # Aliases, build constants, and bundle settings
```

Unit tests live alongside the modules they cover.

## Development & Verification

| Command                                      | Purpose                                                        |
| -------------------------------------------- | -------------------------------------------------------------- |
| `npm run dev`                                | Start the local Vite server with optional mocks and DevTools.  |
| `npm run typecheck`                          | Check application TypeScript types.                            |
| `npm run test.unit -- --run --threads false` | Run the unit suite once.                                       |
| `npm run build`                              | Type-check and create a minified production bundle in `dist/`. |
| `npm run preview`                            | Serve the production bundle locally; build first.              |

For development browser tests, start `npm run dev` in another terminal, then run:

```bash
npm run test.e2e -- --spec cypress/e2e/test.cy.ts --config baseUrl=http://localhost:5173
```

Use the actual port printed by Vite. The development suite expects the default demo credentials, mocks, and DevTools to be enabled.

To check the production integration boundary, run `npm run build`, start `npm run preview`, then run:

```bash
npm run test.e2e -- --spec cypress/e2e/production.cy.ts --env production=true --config baseUrl=http://localhost:4173
```

The production smoke test checks that the app loads, DevTools is absent, and demo credentials cannot authenticate without a real adapter. This spec is skipped unless `production=true` is supplied.

Builds target ES2020, disable source maps, and split the React runtime into a shared chunk. Mock code and DevTools are excluded from production. Enable legacy output only when needed, and configure Vite's `base` and your host's SPA fallback rules for your deployment path.

## Contributing

Bug reports, accessibility improvements, translations, and integration examples are welcome.

1. Open an [issue](https://github.com/LunaNezha/imedica-login/issues) describing the problem or proposal.
2. Fork the repository and keep your changes focused.
3. Add or update tests for behavior changes; check both themes and RTL/LTR for UI changes.
4. Run type checks, the relevant tests, and the production build.
5. Submit a pull request with a clear description and screenshots for visual changes.

CI is not currently configured in this checkout. The build badge intentionally does not claim a live passing status; replace it with a workflow badge when automated checks are added.

## License

The previous README identified the project as MIT-licensed, but this checkout does not include a `LICENSE` file. Maintainers should confirm the intended license and add its full text before redistribution; the badge reflects that pending documentation rather than asserting a verified license grant.
