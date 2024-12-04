import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import ButtonLoader from "./loaders/button-loader";
import { cn } from "@src/utils/classnames";
import { Link } from "react-router-dom";

const buttonVariants = cva(
  [
    "flex",
    "btn",
    "shadows",
    "items-center",
    "justify-center",
    "gap-2",
    "cursor-pointer",
  ],
  {
    variants: {
      variant: {
        "filled-default": [
          "bg-white-50",
          "dark:bg-big-stone-950",
          "text-white-950",
          "dark:text-white-200",
          "hover:text-blue-600",
          "hover:dark:text-blue-600",
        ],
        "filled-default-bordered": [
          "border-white-950/5",
          "dark:border-white-50/10",
          "bg-white-50",
          "dark:bg-big-stone-950",
          "text-white-950",
          "dark:text-white-200",
          "hover:text-blue-600",
          "hover:dark:text-blue-600",
        ],
        "filled-green": [
          "bg-emerald-400",
          "text-white-50",
          "hover:bg-emerald-500",
          "hover:dark:bg-emerald-600",
        ],
        "filled-blue": [
          "bg-blue-600",
          " text-white-50",
          " hover:bg-blue-700",
          " hover:dark:bg-blue-700",
        ],
        "filled-red": [
          "bg-rose-400",
          " text-white-50",
          " hover:bg-rose-500",
          " hover:dark:bg-rose-500",
        ],
        "outlined-default": [
          "bg-transparent",
          "text-white-950",
          "border-white-950/20",
          "hover:bg-white-950/10",

          "dark:text-white-200",
          "dark:border-white-200/20",
          "hover:dark:bg-white-200/10",
        ],
        "outlined-green": [
          "bg-transparent",
          "border-emerald-400",
          "text-emerald-400",
          "hover:bg-emerald-400/10",
        ],
        "outlined-blue": [
          "bg-transparent",
          "border-blue-600",
          "text-blue-600",
          "hover:bg-blue-600/10",
        ],
        "outlined-red": [
          "bg-transparent",
          "border-rose-400",
          "text-rose-400",
          "hover:bg-rose-400/10",
        ],
        "text-default": [
          "shadow-none",
          "bg-transparent",
          "text-white-950",
          "dark:text-white-200",
          "hover:text-blue-600",
          "hover:dark:text-blue-500",
          "hover:bg-blue-600/10",
          "hover:dark:bg-blue-600/10",
        ],
        "text-green": [
          "shadow-none",
          "bg-transparent",
          "text-emerald-400",
          "hover:text-emerald-400",
          "hover:dark:text-emerald-400",
          "hover:bg-emerald-400/25",
          "hover:dark:bg-emerald-400/25",
        ],
        "text-blue": [
          "shadow-none",
          "bg-transparent",
          "text-blue-600",
          "hover:text-blue-600",
          "hover:dark:text-blue-600",
          "hover:bg-blue-600/25",
          "hover:dark:bg-blue-600/25",
        ],
        "text-red": [
          "shadow-none",
          "bg-transparent",
          "text-rose-400",
          "hover:text-rose-400",
          "hover:dark:text-rose-400",
          "hover:bg-rose-400/25",
          "hover:dark:bg-rose-400/25",
        ],
        "text-violet": [
          "shadow-none",
          "bg-transparent",
          "text-violet-500",
          "hover:text-violet-500",
          "hover:dark:text-violet-500",
          "hover:bg-violet-500/25",
          "hover:dark:bg-violet-500/25",
        ],
        "translucent-blue": [
          "shadow-none",
          "bg-transparent",
          "text-blue-500",
          "bg-blue-600/20",
          "hover:bg-blue-600/40",
          "dark:text-blue-300",
          "dark:bg-blue-600/30",
          "hover:dark:bg-blue-600/50",
        ],
        "translucent-green": [
          "shadow-none",
          "bg-transparent",
          "text-emerald-400",
          "bg-emerald-400/20",
          "hover:bg-emerald-400/40",
        ],
      },
      fullWidth: {
        true: ["w-full"],
      },
      shadows: {
        none: ["shadow-none"],
        sm: ["shadow-sm"],
        md: ["shadow-md"],
        lg: ["shadow-lg"],
        xl: ["shadow-xl"],
        "2xl": ["shadow-2xl"],
        "3xl": ["shadow-3xl"],
      },
      padding: {
        "square-sm": ["p-2"],
        "square-md": ["p-3"],
        none: ["p-0"],
        otp: ["px-3", "py-2"],
        xs: ["px-2", "py-1"],
        sm: ["px-3", "py-2"],
        md: ["px-3 py-2"],
        lg: ["px-5 py-4"],
      },
      borderWidth: {
        0: ["border-0"],
        1: ["border"],
        2: ["border-2"],
        3: ["border-[3px]"],
        4: ["border-4"],
      },
      textTransform: {
        normal: ["normal-case"],
        lowercase: ["lowercase"],
        uppercase: ["uppercase"],
        capitalize: ["capitalize"],
      },
      textSize: {
        xs: ["text-xs"],
        sm: ["text-sm"],
        md: ["text-base"],
        lg: ["text-lg"],
        xl: ["text-xl"],
      },
      fontWeight: {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
        black: "font-black",
      },
      round: {
        none: ["rounded-none"],
        md: ["rounded-md"],
        lg: ["rounded-lg"],
        xl: ["rounded-xl"],
        full: ["rounded-full"],
      },
    },
    defaultVariants: {
      variant: "filled-default",
      padding: "md",
      textSize: "md",
      round: "md",
      shadows: "md",
      fontWeight: "normal",
      textTransform: "normal",
      borderWidth: 0,
      fullWidth: false,
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
    href?: any;
    children?: React.ReactNode;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      isLoading,
      round,
      padding,
      textSize,
      fullWidth,
      shadows,
      variant,
      fontWeight,
      textTransform,
      borderWidth,
      href,
      children,
      ...props
    },
    ref,
  ) => {
    const buttonUI = () => {
      return (
        <button
          ref={ref}
          className={cn(
            buttonVariants({
              className,
              round,
              padding,
              textSize,
              fullWidth,
              shadows,
              fontWeight,
              borderWidth,
              textTransform,
              variant,
            }),
            "outline-none disabled:pointer-events-none disabled:select-none disabled:opacity-50",
            isLoading && "pointer-events-none relative select-none",
          )}
          {...props}
        >
          {children}

          {isLoading && (
            <ButtonLoader
              className={cn(
                { "rounded-full": round == "full" },
                { "rounded-xl": round == "xl" },
                { "rounded-lg": round == "lg" },
                { "rounded-md": round == "md" },
              )}
            />
          )}
        </button>
      );
    };

    return href ? (
      <Link to={href} className={cn(isLoading && "relative select-none")}>
        {buttonUI()}
      </Link>
    ) : (
      buttonUI()
    );
  },
);

export { Button, buttonVariants };
