import { cn } from "@/shared/lib/cn";
import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#58A8E0] text-white hover:bg-[#4A96CC] hover:shadow-[0_4px_12px_rgba(88,168,224,0.3)] active:bg-[#3E84B8] active:scale-[0.98]",
  secondary:
    "bg-[#3B82F6]/12 text-[#3B82F6] dark:bg-[#7dd3fc]/15 dark:text-[#7dd3fc] hover:bg-[#3B82F6]/20 dark:hover:bg-[#7dd3fc]/25 border-0",
  ghost:
    "bg-transparent text-[#3B82F6] dark:text-[#7dd3fc] hover:bg-[rgba(59,130,246,0.05)] dark:hover:bg-[rgba(125,211,252,0.08)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ variant = "primary", size = "md", className, children, ...props }, ref) {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] disabled:opacity-50 disabled:pointer-events-none";

    const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

    if ("href" in props && props.href) {
      const { href, ...linkProps } = props as ButtonAsLink;

      if (href.startsWith("#")) {
        return (
          <a
            href={href}
            className={classes}
            ref={ref as React.Ref<HTMLAnchorElement>}
            {...linkProps}
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          href={href}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...linkProps}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(props as ButtonAsButton)}
      >
        {children}
      </button>
    );
  }
);
