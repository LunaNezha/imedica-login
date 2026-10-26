import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from "notistack";
import { ActionButton, ActionLink } from "@src/components/ui/action-button";
import { Icon } from "@src/components/ui/icon";
import Input from "@src/components/ui/forms/simple-input";
import {
  AuthFormProps,
  LoginWithUsernameFormValues,
} from "@src/types/auth.type";
import { LoginWithUsernameSchema } from "@src/utils/schemas/auth-schemas";
import { PathNames } from "@src/constants/pathnames.const";
import { useAuthSubmit } from "./use-auth-submit";
import { useLocalizedValidation } from "./use-localized-validation";
import { AuthHeading } from "./auth-heading";
import SocialButtons from "./social-buttons";
import AuthFooter from "./auth-footer";
import { useOptionalAuth } from "@src/providers/auth-provider";
import { useDevValidation } from "./use-dev-validation";

export default function LoginWithUsername({
  onAuthenticate,
  onForgotPassword,
}: AuthFormProps<LoginWithUsernameFormValues>) {
  const { t } = useTranslation();
  const auth = useOptionalAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    clearErrors,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<LoginWithUsernameFormValues>({
    resolver: zodResolver(LoginWithUsernameSchema(t)),
    defaultValues: { username: "", password: "" },
  });
  useLocalizedValidation(trigger, isSubmitted);
  useDevValidation(trigger, clearErrors);
  const onSubmit = useAuthSubmit(onAuthenticate);
  const onError = (error: FieldErrors<LoginWithUsernameFormValues>) => {
    const message = error.username?.message ?? error.password?.message;
    if (message) enqueueSnackbar(message, { variant: "error" });
  };

  return (
    <main className="auth-screen auth-form-screen">
      <AuthHeading
        icon="heart"
        eyebrow={t("auth.sign_in_eyebrow")}
        title={t("auth.sign_in_title")}
        description={t("auth.sign_in_description")}
      />
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit, onError)}
        className="auth-form"
      >
        <Input
          {...register("username")}
          label={t("input_lables.username")}
          type="text"
          autoComplete="username"
          icon="user"
          errors={errors.username?.message}
          disabled={isSubmitting}
        />
        <Input
          {...register("password")}
          label={t("input_lables.password")}
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          icon="lock"
          errors={errors.password?.message}
          disabled={isSubmitting}
        >
          <button
            type="button"
            className="field-toggle"
            aria-label={t(
              showPassword ? "auth.hide_password" : "auth.show_password",
            )}
            aria-pressed={showPassword}
            disabled={isSubmitting}
            onClick={() => setShowPassword((visible) => !visible)}
          >
            <Icon name={showPassword ? "eyeOff" : "eye"} />
          </button>
        </Input>
        <div className="auth-form-meta">
          <span>
            <Icon name="shield" />
            {t("auth.private_space")}
          </span>
          <button
            type="button"
            className="text-action"
            disabled={isSubmitting}
            onClick={async () => {
              const recover = onForgotPassword ?? auth?.forgotPassword;
              if (!recover) {
                enqueueSnackbar(t("auth.recovery_placeholder"), {
                  variant: "info",
                });
                return;
              }
              try {
                await recover();
              } catch {
                enqueueSnackbar(t("messages.operation_failed"), {
                  variant: "error",
                });
              }
            }}
          >
            {t("auth.forgot_password")}
          </button>
        </div>
        <ActionButton type="submit" loading={isSubmitting}>
          <span>{t(isSubmitting ? "auth.signing_in" : "auth.sign_in")}</span>
          {!isSubmitting && (
            <Icon name="arrowForward" className="directional-icon" />
          )}
        </ActionButton>
      </form>
      <SocialButtons disabled={isSubmitting} />
      <ActionLink to={PathNames.LoginWithPhone} variant="ghost">
        <Icon name="phone" />
        {t("auth.use_phone")}
      </ActionLink>
      <AuthFooter />
    </main>
  );
}
