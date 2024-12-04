import { TFunction } from "i18next";
import { z } from "zod";

export const PhoneNumberValidation = (
  t: TFunction<"translations", undefined>,
) => {
  return z
    .string({ required_error: t("validations.requireds.password") })
    .min(1, { message: t("validations.requireds.password") });
};

export const UsernameValidation = (t: TFunction<"translations", undefined>) => {
  return z
    .string({ required_error: t("validations.requireds.username") })
    .min(1, { message: t("validations.requireds.username") });
};

export const VerifyCodeValidation = (
  t: TFunction<"translations", undefined>,
) => {
  return z
    .string({ required_error: t("validations.requireds.password") })
    .min(1, { message: t("validations.requireds.password") });
};
