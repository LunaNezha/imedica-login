import i18n, { i18nReady } from "./i18n";
import { lazy, Suspense } from "react";
import { createRoot, Root } from "react-dom/client";
import secureLocalStorage from "react-secure-storage";
import { THEME } from "./constants/local-storage.const";
import { Theme, ThemeProvider } from "./providers/theme-provider";
import { LIGHT } from "./constants/theme.const";
import { I18nextProvider } from "react-i18next";
import ToastProvider from "./providers/toast-provider";
import ErrorBoundary from "./components/ui/error-boundary";
import AppLoading from "./pages/app-loading";
import { AuthProvider } from "./providers/auth-provider";
import { defaultAuthAdapter } from "./services/default-auth";

const App = lazy(() => import("./App"));
const container = document.getElementById("root");

// Extending the HTMLElement type to add __root
type ContainerWithRoot = HTMLElement & { __root?: Root };

if (container) {
  const typedContainer = container as ContainerWithRoot; // Cast container to the extended type

  // Check if root is already created before initializing
  if (!typedContainer.__root) {
    const root = createRoot(typedContainer);
    typedContainer.__root = root; // Store the root in the container
  }

  const root = typedContainer.__root!;
  let initialTheme: Theme = LIGHT;
  try {
    const saved = secureLocalStorage.getItem(THEME);
    if (saved === "light" || saved === "dark") initialTheme = saved;
  } catch {
    initialTheme = LIGHT;
  }

  void i18nReady.then(() =>
    root.render(
      <ErrorBoundary>
        <Suspense fallback={<AppLoading />}>
          <I18nextProvider i18n={i18n}>
            <ThemeProvider initialTheme={initialTheme}>
              <ToastProvider>
                <AuthProvider adapter={defaultAuthAdapter}>
                  <App />
                </AuthProvider>
              </ToastProvider>
            </ThemeProvider>
          </I18nextProvider>
        </Suspense>
      </ErrorBoundary>,
    ),
  );
} else {
  console.error("Root container not found");
}
