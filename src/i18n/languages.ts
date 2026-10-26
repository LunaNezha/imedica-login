export const supportedLanguages = ["en", "fa", "ar"] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

export const languageOptions: ReadonlyArray<{
  code: SupportedLanguage;
  label: string;
}> = [
  { code: "en", label: "English" },
  { code: "fa", label: "فارسی" },
  { code: "ar", label: "العربية" },
];

export function normalizeLanguage(
  value: string,
): SupportedLanguage | undefined {
  const language = value.trim().toLowerCase().split(/[-_]/)[0];
  return supportedLanguages.find((supported) => supported === language);
}
