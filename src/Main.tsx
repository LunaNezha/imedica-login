import i18n from "./i18n";
import { lazy } from "react";
import { createRoot, Root } from "react-dom/client";
import secureLocalStorage from "react-secure-storage";
import { THEME } from "./constants/local-storage.const";
import { Theme, ThemeProvider } from "./providers/theme-provider";
import { LIGHT } from "./constants/theme.const";
import { I18nextProvider } from "react-i18next";
import ToastProvider from "./providers/toast-provider";

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
  const initialTheme = (secureLocalStorage.getItem(THEME) as Theme) || LIGHT;

  root.render(
    <I18nextProvider i18n={i18n}>
      <ThemeProvider initialTheme={initialTheme}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ThemeProvider>
    </I18nextProvider>,
  );
} else {
  console.error("Root container not found");
}
