import { useEffect } from "react";
import {
  FieldValues,
  UseFormClearErrors,
  UseFormTrigger,
} from "react-hook-form";
import { appConfig } from "@src/config/app-config";

export function useDevValidation<Values extends FieldValues>(
  trigger: UseFormTrigger<Values>,
  clearErrors: UseFormClearErrors<Values>,
) {
  useEffect(() => {
    if (!import.meta.env.DEV || !appConfig.devTools) return;
    const validate = () => {
      void trigger();
    };
    const clear = () => clearErrors();
    window.addEventListener("imedica:validate", validate);
    window.addEventListener("imedica:clear-errors", clear);
    return () => {
      window.removeEventListener("imedica:validate", validate);
      window.removeEventListener("imedica:clear-errors", clear);
    };
  }, [trigger, clearErrors]);
}
