import { forwardRef, InputHTMLAttributes, ReactNode, useId } from "react";
import { cn } from "@src/utils/classnames";
import { Icon, IconName } from "@src/components/ui/icon";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: IconName;
  errors?: string;
  hint?: string;
  inputClassName?: string;
  children?: ReactNode;
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      icon,
      errors,
      hint,
      className,
      inputClassName,
      children,
      id,
      required = true,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const detailId = inputId + "-detail";
    return (
      <div
        className={cn(
          "floating-field",
          errors && "floating-field--error",
          props.disabled && "floating-field--disabled",
          className,
        )}
      >
        <div className="floating-field-control">
          {icon && (
            <span className="floating-field-icon">
              <Icon name={icon} />
            </span>
          )}
          <div className="floating-field-content">
            <input
              {...props}
              id={inputId}
              ref={ref}
              required={required}
              placeholder=" "
              aria-invalid={Boolean(errors)}
              aria-describedby={errors || hint ? detailId : undefined}
              className={cn("floating-field-input", inputClassName)}
            />
            <label htmlFor={inputId}>{label}</label>
          </div>
          {children}
        </div>
        {(errors || hint) && (
          <p
            id={detailId}
            role={errors ? "alert" : undefined}
            className={errors ? "field-error" : "field-hint"}
          >
            {errors && <Icon name="info" />}
            {errors || hint}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";
export default Input;
