import { TFunction } from "i18next";
import { z } from "zod";
import {
  PhoneNumberValidation,
  UsernameValidation,
  VerifyCodeValidation,
  PasswordValidation,
} from "../validations/auth-validations";

export const LoginWithPhoneSchema = (
  t: TFunction<"translations", undefined>,
) => {
  return z.object({
    phoneNumber: PhoneNumberValidation(t),
    verifyCode: VerifyCodeValidation(t),
  });
};

export const LoginWithUsernameSchema = (
  t: TFunction<"translations", undefined>,
) => {
  return z.object({
    username: UsernameValidation(t),
    password: PasswordValidation(t),
  });
};
