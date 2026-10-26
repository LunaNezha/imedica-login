import { useEffect } from "react";
import { FieldValues, UseFormTrigger } from "react-hook-form";
import { useTranslation } from "react-i18next";

export function useLocalizedValidation<Values extends FieldValues>(
  trigger: UseFormTrigger<Values>,
  isSubmitted: boolean,
): void {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage;

  useEffect(() => {
    if (isSubmitted) void trigger();
  }, [language, isSubmitted, trigger]);
}
