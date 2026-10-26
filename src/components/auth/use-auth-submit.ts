import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from "notistack";
import { useOptionalAuth } from "@src/providers/auth-provider";
import { AuthError } from "@src/types/auth";
import {
  LoginWithPhoneFormValues,
  LoginWithUsernameFormValues,
} from "@src/types/auth.type";

export function useAuthSubmit<
  Values extends LoginWithPhoneFormValues | LoginWithUsernameFormValues,
>(onAuthenticate?: (values: Values) => void | Promise<void>) {
  const { t } = useTranslation();
  const auth = useOptionalAuth();

  return async (values: Values): Promise<void> => {
    if (!onAuthenticate && !auth) {
      enqueueSnackbar(t("messages.authentication_not_configured"), {
        variant: "info",
      });
      return;
    }
    try {
      if (onAuthenticate) await onAuthenticate(values);
      else if (auth)
        await auth.login(
          "username" in values
            ? { method: "password", ...values }
            : { method: "phone", ...values },
        );
      enqueueSnackbar(t("auth.sign_in_success"), { variant: "success" });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      enqueueSnackbar(
        error instanceof AuthError && error.code === "not_configured"
          ? t("messages.authentication_not_configured")
          : t("messages.operation_failed"),
        { variant: "error" },
      );
    }
  };
}
