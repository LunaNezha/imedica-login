import LightLoginImage from "@assets/images/login-phone-light.png";
import DarkLoginImage from "@assets/images/login-phone-dark.png";

import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from "notistack";
import { Button } from "@src/components/buttons";
import { IonText } from "@ionic/react";
import { useTheme } from "@src/providers/theme-provider";
import { DARK } from "@src/constants/theme.const";
import Input from "@src/components/forms/simple-input";
import { LoginWithUsernameFormValues } from "@src/@types/auth.type";
import { LoginWithUsernameSchema } from "@src/libs/schemas/auth-schemas";

const LoginWithUsername = () => {
  const version = __APP_VERSION__;
  const { t } = useTranslation("translations");
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginWithUsernameFormValues>({
    resolver: zodResolver(LoginWithUsernameSchema(t)),
  });

  const onSubmit: SubmitHandler<LoginWithUsernameFormValues> = async (
    data,
  ) => {};

  const onError = (error: FieldErrors<LoginWithUsernameFormValues>) => {
    error.username?.message &&
      enqueueSnackbar(error.username.message, { variant: "error" });
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
          {/* username */}
          <Input
            {...register("username")}
            type="text"
            icon="fi fi-rr-user"
            name="username"
            padding={"lg"}
            borderRadius={"lg"}
            label={t("input_lables.username")}
            errors={errors.username?.message}
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

export default LoginWithUsername;
