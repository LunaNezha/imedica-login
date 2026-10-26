import { TFunction } from "i18next";
import { z } from "zod";
import { normalizeDigits } from "@src/utils/normalize-digits";

export const PhoneNumberValidation = (t: TFunction<"translations">) =>
  z
    .string({ required_error: t("validations.requireds.phone_number") })
    .transform((value) => normalizeDigits(value).replace(/[\s-]/g, ""))
    .pipe(
      z
        .string()
        .min(1, t("validations.requireds.phone_number"))
        .regex(/^09\d{9}$/, t("validations.phone_number_format")),
    );

export const UsernameValidation = (t: TFunction<"translations">) =>
  z
    .string({ required_error: t("validations.requireds.username") })
    .trim()
    .min(1, t("validations.requireds.username"));

export const PasswordValidation = (t: TFunction<"translations">) =>
  z
    .string({ required_error: t("validations.requireds.password") })
    .min(1, t("validations.requireds.password"));

export const VerifyCodeValidation = (t: TFunction<"translations">) =>
  z
    .string({ required_error: t("validations.requireds.verification_code") })
    .transform(normalizeDigits)
    .pipe(
      z
        .string()
        .min(1, t("validations.requireds.verification_code"))
        .regex(/^\d{6}$/, t("validations.verification_code_format")),
    );
