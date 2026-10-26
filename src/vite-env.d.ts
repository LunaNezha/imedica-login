/// <reference types="vite/client" />

declare const __APP_VERSION__: string;

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_DEFAULT_LANGUAGE?: string;
  readonly VITE_ENABLE_MOCK_AUTH?: string;
  readonly VITE_ENABLE_DEVTOOLS?: string;
  readonly VITE_MOCK_USERNAME?: string;
  readonly VITE_MOCK_PASSWORD?: string;
  readonly VITE_MOCK_PHONE?: string;
  readonly VITE_MOCK_OTP?: string;
  readonly VITE_MOCK_LATENCY_MS?: string;
}
