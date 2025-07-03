import React from "react";
import type { ButtonHTMLAttributes } from "react";

type Variant = "default" | "success" | "warning" | "error" | "outline" | "link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  default: "bg-black text-white hover:bg-primary/90",
  success: "bg-green-600 text-white hover:bg-green-500",
  warning: "bg-yellow-500 text-black hover:bg-yellow-400",
  error: "bg-red-600 text-white hover:bg-red-500",
  outline: "border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-900",
  link: "text-primary underline-offset-4 hover:underline"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const finalClassName = [
      baseClasses,
      variantClasses[variant],
      className
    ].join(" ");

    return (
      <button ref={ref} className={finalClassName} {...props} />
    );
  }
);

Button.displayName = "Button";