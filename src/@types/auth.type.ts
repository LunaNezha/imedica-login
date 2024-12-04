import {
  LoginWithPhoneSchema,
  LoginWithUsernameSchema,
} from "@src/libs/schemas/auth-schemas";
import { z } from "zod";

export type LoginWithPhoneFormValues = z.infer<
  ReturnType<typeof LoginWithPhoneSchema>
>;

export type LoginWithUsernameFormValues = z.infer<
  ReturnType<typeof LoginWithUsernameSchema>
>;

export type LoginWithPhoneRequest = {
  phoneNumber: string;
  verifyCode: string;
};
