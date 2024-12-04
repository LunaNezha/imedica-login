import React from "react";
import {
  BorderRadiusProps,
  BorderRadiusVariants,
  PaddingProps,
  PaddingVariants,
} from "@src/utils/variants";
import { cn } from "@src/utils/classnames";
import Tooltip from "../tooltip";
import { Positions } from "@src/enums/positions.enum";

type Props = BorderRadiusProps &
  PaddingProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    otp: string[];
    numberOfInputs: number;
    label?: string;
    className?: string;
    hint?: string;
    errors?: any;
    hasDetails?: boolean;
    required?: boolean;
    children?: React.ReactNode;
    inputType?: React.InputHTMLAttributes<HTMLInputElement>["type"];
    inputRef: HTMLInputElement[];
    onChangeOtp?: (otp: string[]) => void;
    clearOTP?: () => void;
  };

const OTPInput = (props: Props) => {
  const {
    otp,
    numberOfInputs,
    inputType = "text",
    errors,
    label,
    hint,
    borderRadius,
    padding,
    className,
    children,
    onChangeOtp,
    clearOTP,
    inputRef,
    required = true,
    hasDetails = true,
    ...rest
  } = props;

  const handleOnChange = (event: any, index: number): void => {
    const value = event.target.value;
    const newOTP = [...otp];
    newOTP[index] = value;

    onChangeOtp?.(newOTP);

    if (value && inputRef[index + 1]) {
      inputRef[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event: any, index: number) => {
    if (event.key === "Backspace" && !otp[index] && inputRef[index - 1]) {
      inputRef[index - 1]?.focus();
    } else {
      event.currentTarget.select();
    }
  };

  return (
    <div
      style={{ direction: "ltr" }}
      className={cn(
        "relative flex flex-col gap-1.5 text-white-950 dark:text-white-200",
        className,
      )}
    >
      {/* top content */}
      {hasDetails && (
        <div className="flex items-center justify-between px-2">
          <label className="text-xs font-bold ltr:font-montserrat rtl:font-iranyekan">
            {label} {required && <span className="text-rose-400">*</span>}
          </label>

          <div className="flex items-center gap-2">
            {/* error message */}
            {errors && (
              <Tooltip position={Positions.Top} message={errors}>
                <i className="fi fi-rr-exclamation text-sm text-rose-400 duration-300 ease-out"></i>
              </Tooltip>
            )}

            {/* hint */}
            {hint && (
              <Tooltip position={Positions.Top} message={hint}>
                <i className="fi fi-rr-lightbulb-on text-sm text-orange-500 duration-300 ease-out"></i>
              </Tooltip>
            )}
          </div>
        </div>
      )}

      {/* bottom content */}
      <div className="flex flex-1 items-center gap-2">
        {otp.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <input
                name={`item-${index}`}
                ref={(ref) => (inputRef[index] = ref as HTMLInputElement)}
                type={inputType}
                placeholder="-"
                onFocus={(event) => event.target.select()}
                onInput={(event) => handleOnChange(event, index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={cn(
                  BorderRadiusVariants({ borderRadius }),
                  PaddingVariants({ padding }),
                  "w-full min-w-[20px] border border-white-950/5 bg-gray-50 px-1.5 py-3 text-center placeholder:text-white-950/30 focus:outline-0 disabled:pointer-events-none disabled:select-none disabled:opacity-50 dark:border-white-200/5 dark:bg-big-stone-950 placeholder:dark:text-white-200/30 ltr:font-montserrat rtl:font-iranyekan",
                  errors && "border-rose-300",
                )}
                {...rest}
              />
            </React.Fragment>
          );
        })}
      </div>

      {children && <div>{children}</div>}
    </div>
  );
};

const forwardOTPInput = React.forwardRef(OTPInput);

export default forwardOTPInput;
