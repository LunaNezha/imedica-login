import { forwardRef, useId, useRef } from "react";
import { normalizeDigits } from "@src/utils/normalize-digits";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  name: string;
  numberOfInputs?: number;
  label: string;
  errors?: string;
  disabled?: boolean;
};

const OTPInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      value,
      onChange,
      onBlur,
      name,
      numberOfInputs = 6,
      label,
      errors,
      disabled,
    },
    ref,
  ) => {
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const errorId = useId();

    const updateDigits = (text: string, index: number) => {
      const digits = normalizeDigits(text).replace(/\D/g, "");
      if (text && !digits) return;
      const start = Math.min(index, value.length);
      const nextValue = (
        value.slice(0, start) +
        digits +
        value.slice(start + Math.max(digits.length, 1))
      ).slice(0, numberOfInputs);
      onChange(nextValue);
      if (digits)
        inputRefs.current[
          Math.min(start + digits.length, numberOfInputs - 1)
        ]?.focus();
    };

    return (
      <fieldset disabled={disabled} className="otp-field">
        <legend className="otp-label">{label}</legend>
        <div dir="ltr" className="otp-digits">
          {Array.from({ length: numberOfInputs }, (_, index) => (
            <input
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element;
                if (index === 0) {
                  if (typeof ref === "function") ref(element);
                  else if (ref) ref.current = element;
                }
              }}
              name={index === 0 ? name : undefined}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              aria-label={label + " " + (index + 1)}
              aria-invalid={Boolean(errors)}
              aria-describedby={errors ? errorId : undefined}
              value={value[index] ?? ""}
              placeholder="-"
              onBlur={onBlur}
              onFocus={(event) => event.currentTarget.select()}
              onChange={(event) =>
                updateDigits(event.currentTarget.value, index)
              }
              onPaste={(event) => {
                event.preventDefault();
                updateDigits(event.clipboardData.getData("text"), index);
              }}
              onKeyDown={(event) => {
                if (event.key === "Backspace") {
                  event.preventDefault();
                  const position = value[index] ? index : index - 1;
                  if (position >= 0) {
                    onChange(
                      value.slice(0, position) + value.slice(position + 1),
                    );
                    inputRefs.current[position]?.focus();
                  }
                } else if (
                  event.key === "ArrowLeft" ||
                  event.key === "ArrowRight"
                ) {
                  event.preventDefault();
                  inputRefs.current[
                    index + (event.key === "ArrowLeft" ? -1 : 1)
                  ]?.focus();
                }
              }}
              className="otp-digit"
            />
          ))}
        </div>
        {errors && (
          <p id={errorId} role="alert" className="field-error">
            {errors}
          </p>
        )}
      </fieldset>
    );
  },
);

OTPInput.displayName = "OTPInput";
export default OTPInput;
