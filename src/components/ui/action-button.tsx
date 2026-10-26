import { ButtonHTMLAttributes, forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@src/utils/classnames";

export const actionStyles = cva("action-button", {
  variants: {
    variant: {
      primary: "action-button--primary",
      secondary: "action-button--secondary",
      ghost: "action-button--ghost",
    },
  },
  defaultVariants: { variant: "primary" },
});
type Variants = VariantProps<typeof actionStyles>;
type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  Variants & { loading?: boolean };

export const ActionButton = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      className,
      variant,
      loading,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => (
    <button
      {...props}
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(actionStyles({ variant }), className)}
    >
      {loading && <span className="action-spinner" aria-hidden="true" />}
      {children}
    </button>
  ),
);
ActionButton.displayName = "ActionButton";

export function ActionLink({
  variant,
  className,
  ...props
}: LinkProps & Variants) {
  return (
    <Link {...props} className={cn(actionStyles({ variant }), className)} />
  );
}
