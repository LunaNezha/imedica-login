import {
  BorderRadiusProps,
  BorderRadiusVariants,
  PaddingProps,
  PaddingVariants,
  TextAlignsProps,
  TextAlignsVariants,
  TextSizesProps,
  TextSizesVariants,
} from "@src/utils/variants";
import React from "react";
import Tooltip from "../tooltip";
import { useTranslation } from "react-i18next";
import { cn } from "@src/utils/classnames";
import { Positions } from "@src/enums/positions.enum";

type Props = BorderRadiusProps &
  TextSizesProps &
  PaddingProps &
  TextAlignsProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
    inputClassName?: string;
    icon?: string;
    errors?: any;
    hint?: string;
    label?: string;
    hasDetails?: boolean;
    required?: boolean;
    children?: React.ReactNode;
  };

const Input = (
  {
    className,
    inputClassName,
    errors,
    icon,
    borderRadius,
    padding,
    textSizes,
    textAligns,
    label,
    hint,
    children,
    required = true,
    hasDetails = true,
    ...props
  }: Props,
  ref: React.LegacyRef<HTMLInputElement>,
) => {
  const { t } = useTranslation("translations");

  return (
    <div
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
      <div
        className={cn(
          BorderRadiusVariants({ borderRadius }),
          PaddingVariants({ padding }),
          "flex items-center gap-2 border border-white-950/5 bg-gray-50 dark:border-white-200/5 dark:bg-big-stone-950",
          errors && "border-rose-300",
        )}
      >
        <input
          ref={ref}
          autoComplete="off"
          placeholder={t("inputs.enter_value")}
          className={cn(
            TextSizesVariants({ textSizes }),
            TextAlignsVariants({ textAligns }),
            !hasDetails ? "border-transparent" : "",
            "block w-full appearance-none border-0 bg-transparent duration-150 ease-in focus:outline-0 disabled:pointer-events-none disabled:select-none disabled:opacity-50 ltr:font-montserrat rtl:font-iranyekan",
            inputClassName,
          )}
          {...props}
        />

        {children && children}

        {/* input releavent icon */}
        {icon && <i className={cn(icon, "text-sm duration-300 ease-out")}></i>}
      </div>
    </div>
  );
};

const forwardSimpleInput = React.forwardRef(Input);

export default forwardSimpleInput;
