import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputMask } from "@react-input/mask";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from "notistack";
import { ActionButton, ActionLink } from "@src/components/ui/action-button";
import { Icon } from "@src/components/ui/icon";
import Input from "@src/components/ui/forms/simple-input";
import OTPInput from "@src/components/ui/forms/otp-input";
import { AuthFormProps, LoginWithPhoneFormValues } from "@src/types/auth.type";
import { LoginWithPhoneSchema } from "@src/utils/schemas/auth-schemas";
import { PathNames } from "@src/constants/pathnames.const";
import { useAuthSubmit } from "./use-auth-submit";
import { useDevValidation } from "./use-dev-validation";
import { useLocalizedValidation } from "./use-localized-validation";
import { AuthHeading } from "./auth-heading";
import AuthFooter from "./auth-footer";

export default function LoginWithPhone({
  onAuthenticate,
}: AuthFormProps<LoginWithPhoneFormValues>) {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    trigger,
    clearErrors,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<LoginWithPhoneFormValues>({
    resolver: zodResolver(LoginWithPhoneSchema(t)),
    defaultValues: { phoneNumber: "", verifyCode: "" },
  });
  useLocalizedValidation(trigger, isSubmitted);
  useDevValidation(trigger, clearErrors);
  const onSubmit = useAuthSubmit(onAuthenticate);
  const onError = (error: FieldErrors<LoginWithPhoneFormValues>) => {
    const message = error.phoneNumber?.message ?? error.verifyCode?.message;
    if (message) enqueueSnackbar(message, { variant: "error" });
  };
  return (
    <main className="auth-screen auth-form-screen">
      <AuthHeading
        icon="phone"
        eyebrow={t("auth.phone_eyebrow")}
        title={t("auth.phone_title")}
        description={t("auth.phone_description")}
      />
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit, onError)}
        className="auth-form"
      >
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <InputMask
              {...field}
              component={Input}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              disabled={isSubmitting}
              dir="ltr"
              icon="phone"
              label={t("input_lables.phone_number")}
              mask="____-___-____"
              replacement={{ _: /[0-9۰-۹٠-٩]/ }}
              errors={errors.phoneNumber?.message}
              onFocus={(event) => event.target.select()}
            />
          )}
        />
        <div className="otp-section">
          <Controller
            name="verifyCode"
            control={control}
            render={({ field }) => (
              <OTPInput
                {...field}
                disabled={isSubmitting}
                label={t("input_lables.verification_code")}
                errors={errors.verifyCode?.message}
              />
            )}
          />
          <p className="field-hint">{t("auth.otp_hint")}</p>
        </div>
        <div className="auth-info-note">
          <Icon name="info" />
          <p>{t("auth.phone_policy")}</p>
        </div>
        <ActionButton type="submit" loading={isSubmitting}>
          {t(isSubmitting ? "auth.signing_in" : "auth.verify_sign_in")}
          {!isSubmitting && (
            <Icon name="arrowForward" className="directional-icon" />
          )}
        </ActionButton>
      </form>
      <ActionLink to={PathNames.LoginWithUsername} variant="ghost">
        <Icon name="user" />
        {t("auth.use_username")}
      </ActionLink>
      <AuthFooter />
    </main>
  );
}
