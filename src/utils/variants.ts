import { VariantProps, cva } from "class-variance-authority";

/**
 * * ======================
 * * Border Radius
 * * ======================
 */
export type BorderRadiusProps = VariantProps<typeof BorderRadiusVariants>;
export const BorderRadiusVariants = cva([], {
  variants: {
    borderRadius: {
      none: ["rounded-none"],
      sm: ["rounded-sm"],
      md: ["rounded-md"],
      lg: ["rounded-lg"],
      xl: ["rounded-xl"],
      full: ["rounded-full"],
    },
  },
  defaultVariants: {
    borderRadius: "lg",
  },
});

/**
 * * ======================
 * * Text Sizes
 * * ======================
 */
export type TextSizesProps = VariantProps<typeof TextSizesVariants>;
export const TextSizesVariants = cva([], {
  variants: {
    textSizes: {
      xs: ["text-xs"],
      sm: ["text-xs sm:text-sm"],
      md: ["text-base"],
      lg: ["text-lg"],
      xl: ["text-xl"],
      "2xl": ["text-2xl"],
      "3xl": ["text-3xl"],
    },
  },
  defaultVariants: {
    textSizes: "sm",
  },
});

/**
 * * ======================
 * * Padding
 * * ======================
 */
export type PaddingProps = VariantProps<typeof PaddingVariants>;
export const PaddingVariants = cva([], {
  variants: {
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
  },
  defaultVariants: {
    padding: "md",
  },
});

/**
 * * ======================
 * * Text Aligns
 * * ======================
 */
export type TextAlignsProps = VariantProps<typeof TextAlignsVariants>;
export const TextAlignsVariants = cva([], {
  variants: {
    textAligns: {
      center: "text-center",
      left: "text-left",
      right: "text-right",
      justify: "text-justify",
      auto: "text-left rtl:text-right",
    },
  },
  defaultVariants: {
    textAligns: "auto",
  },
});
