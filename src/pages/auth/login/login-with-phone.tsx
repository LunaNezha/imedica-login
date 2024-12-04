import LightLoginImage from "@assets/images/login-phone-light.png";
import DarkLoginImage from "@assets/images/login-phone-dark.png";

import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginWithPhoneSchema } from "@src/libs/schemas/auth-schemas";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from "notistack";
import { InputMask, MaskEventDetail } from "@react-input/mask";
import { useRef, useState } from "react";
import { Button } from "@src/components/buttons";
import { IonText } from "@ionic/react";
import { useTheme } from "@src/providers/theme-provider";
import { DARK } from "@src/constants/theme.const";
import Input from "@src/components/forms/simple-input";
import OTPInput from "@src/components/forms/otp-input";
import { LoginWithPhoneFormValues } from "@src/@types/auth.type";

const LoginWithPhone = () => {
  const version = __APP_VERSION__;
  const { t } = useTranslation("translations");
  const { theme } = useTheme();
  const [phoneNumberState, setPhoneNumberState] =
    useState<MaskEventDetail | null>(null);
  const numberOfVerificationCodeOTPInputs: number = 6;
  const verificationCodeRef = useRef<HTMLInputElement[]>([]);
  const [verificationCodeOTP, setVerificationCodeOTP] = useState<string[]>(
    new Array(numberOfVerificationCodeOTPInputs).fill(""),
  );
  const [verificationCodeTimer, setVerificationCodeTimer] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginWithPhoneFormValues>({
    resolver: zodResolver(LoginWithPhoneSchema(t)),
  });

  const { ref: phoneNumberRef } = register("phoneNumber");

  const onSubmit: SubmitHandler<LoginWithPhoneFormValues> = async (data) => {};

  const onError = (error: FieldErrors<LoginWithPhoneFormValues>) => {
    error.phoneNumber?.message &&
      enqueueSnackbar(error.phoneNumber.message, { variant: "error" });

    error.verifyCode?.message &&
      enqueueSnackbar(error.verifyCode.message, { variant: "error" });
  };

  return (
    <div className="relative flex h-full flex-col items-center gap-6 p-8">
      {/* illustration */}
      <img
        src={theme === DARK ? DarkLoginImage : LightLoginImage}
        className="mx-auto w-full object-contain"
        alt="login"
      />

      {/* titles */}
      <div className="flex flex-col items-center justify-center gap-[2px] text-center text-white-950 dark:text-white-200">
        <h2 className="text-2xl font-extrabold rtl:font-black">
          {t("titles.login_register")}
        </h2>

        <p className="w-10/12 text-base font-light opacity-80 dark:opacity-60 rtl:font-normal">
          {t("messages.login_welcome")}
        </p>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex w-full flex-col gap-8"
      >
        <div className="flex flex-col gap-4">
          {/* phone number */}
          <InputMask
            {...register("phoneNumber")}
            autoFocus
            dir="ltr"
            component={Input}
            icon="fi fi-rr-phone-call"
            label={t("input_lables.phone_number")}
            value={phoneNumberState?.value ?? ""}
            mask="____-___-____"
            name="phoneNumber"
            borderRadius={"lg"}
            placeholder="0912-222-3333"
            padding={"lg"}
            replacement={{ _: /\d/ }}
            errors={errors.phoneNumber?.message}
            onMask={(event) => setPhoneNumberState(event.detail)}
            onFocus={(event) => event.target.select()}
            ref={phoneNumberRef}
          />

          {/* verification code */}
          <OTPInput
            {...register("verifyCode")}
            inputRef={verificationCodeRef.current}
            otp={verificationCodeOTP}
            numberOfInputs={numberOfVerificationCodeOTPInputs}
            padding={"lg"}
            borderRadius={"lg"}
            inputType="number"
            label={t("input_lables.verification_code")}
            errors={errors.verifyCode?.message}
            onChangeOtp={(value) => {
              setVerificationCodeOTP(value);
            }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-end">
          {/* login button */}
          <Button
            fullWidth
            type="submit"
            variant={"filled-green"}
            textSize={"md"}
            shadows={"md"}
            padding={"lg"}
            fontWeight={"bold"}
            round={"full"}
            // isLoading={isPendingSendLoginData}
          >
            <IonText>{t("buttons.login")}</IonText>
            <i className="fi fi-sr-check-circle"></i>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginWithPhone;
