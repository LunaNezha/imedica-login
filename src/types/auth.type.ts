import {
  LoginWithPhoneSchema,
  LoginWithUsernameSchema,
} from "@src/utils/schemas/auth-schemas";
import { z } from "zod";

export type AuthFormProps<Values> = {
  onAuthenticate?: (values: Values) => void | Promise<void>;
  onForgotPassword?: () => void | Promise<void>;
};

export type LoginWithPhoneFormValues = z.infer<
  ReturnType<typeof LoginWithPhoneSchema>
>;

export type LoginWithUsernameFormValues = z.infer<
  ReturnType<typeof LoginWithUsernameSchema>
>;
