import { describe, expect, it } from "vitest";
import { createInstance } from "i18next";
import en from "@src/i18n/locales/en/translations.json";
import fa from "@src/i18n/locales/fa/translations.json";
import { LoginWithPhoneSchema, LoginWithUsernameSchema } from "./auth-schemas";

const translator = createInstance();
await translator.init({
  lng: "en",
  defaultNS: "translations",
  resources: { en: { translations: en }, fa: { translations: fa } },
});
const translate = translator.getFixedT("en", "translations");

describe("authentication schemas", () => {
  it("requires a password without trimming it or imposing signup rules", () => {
    const schema = LoginWithUsernameSchema(translate);
    expect(
      schema.safeParse({ username: "patient", password: "" }).success,
    ).toBe(false);
    expect(schema.safeParse({ username: "patient" }).success).toBe(false);
    expect(
      schema.parse({ username: "patient", password: " keep spaces " }).password,
    ).toBe(" keep spaces ");
  });
  it("rejects empty and whitespace-only usernames", () => {
    const schema = LoginWithUsernameSchema(translate);
    expect(schema.safeParse({ username: "", password: "secret" }).success).toBe(
      false,
    );
    expect(
      schema.safeParse({ username: "   ", password: "secret" }).success,
    ).toBe(false);
    expect(
      schema.parse({ username: "  patient  ", password: "secret" }),
    ).toEqual({
      username: "patient",
      password: "secret",
    });
  });

  it.each(["0912-222-3333", "۰۹۱۲-۲۲۲-۳۳۳۳", "٠٩١٢-٢٢٢-٣٣٣٣"])(
    "normalizes a masked phone number: %s",
    (phoneNumber) => {
      expect(
        LoginWithPhoneSchema(translate).parse({
          phoneNumber,
          verifyCode: "۰۱۲۳۴۵",
        }),
      ).toEqual({ phoneNumber: "09122223333", verifyCode: "012345" });
    },
  );

  it.each(["", "0912", "08122223333", "091222233333", "0912abc3333"])(
    "rejects an invalid phone number: %s",
    (phoneNumber) => {
      expect(
        LoginWithPhoneSchema(translate).safeParse({
          phoneNumber,
          verifyCode: "123456",
        }).success,
      ).toBe(false);
    },
  );

  it.each(["", "12345", "1234567", "123a56", "123 56"])(
    "rejects an invalid verification code: %s",
    (verifyCode) => {
      expect(
        LoginWithPhoneSchema(translate).safeParse({
          phoneNumber: "09122223333",
          verifyCode,
        }).success,
      ).toBe(false);
    },
  );

  it("uses field-specific translated errors", () => {
    const result = LoginWithPhoneSchema(
      translator.getFixedT("fa", "translations"),
    ).safeParse({ phoneNumber: "", verifyCode: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.phoneNumber?.[0]).toBe(
        fa.validations.requireds.phone_number,
      );
      expect(result.error.flatten().fieldErrors.verifyCode?.[0]).toBe(
        fa.validations.requireds.verification_code,
      );
    }
  });
});
