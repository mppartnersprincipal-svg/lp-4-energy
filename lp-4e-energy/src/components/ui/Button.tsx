import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "cyan" | "navy" | "white" | "outline-light" | "outline-dark" | "wa";
type ButtonSize = "md" | "lg";

interface ButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
}

const BASE =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap " +
  "transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-out " +
  "hover:scale-[1.03] active:scale-[0.97] motion-reduce:hover:scale-100";

const VARIANTS: Record<ButtonVariant, string> = {
  cyan: "bg-cyan text-navy-deep hover:bg-cyan-light hover:shadow-cyan",
  navy: "bg-navy text-white hover:bg-navy-soft hover:shadow-lift",
  white: "bg-white text-navy hover:bg-ice hover:shadow-lift",
  "outline-light": "border border-white/30 text-white hover:border-cyan hover:bg-white/5 hover:text-cyan-light",
  "outline-dark": "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white",
  wa: "bg-wa text-navy-deep hover:brightness-110 hover:shadow-[0_12px_36px_-12px_rgb(37_211_102/0.6)]",
};

const SIZES: Record<ButtonSize, string> = {
  md: "min-h-12 px-6 text-[15px]",
  lg: "min-h-14 px-8 text-base",
};

const EXTERNAL_PATTERN = /^(https?:|mailto:|tel:)/;

/** Link com cara de botão (todos os CTAs da LP são navegação). */
export function Button({
  href,
  variant = "cyan",
  size = "md",
  icon,
  iconPosition = "end",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
  const iconNode = icon ? (
    <span
      aria-hidden="true"
      className={iconPosition === "end" ? "transition-transform duration-300 group-hover:translate-x-1" : ""}
    >
      {icon}
    </span>
  ) : null;
  const content = (
    <>
      {iconPosition === "start" && iconNode}
      {children}
      {iconPosition === "end" && iconNode}
    </>
  );

  if (EXTERNAL_PATTERN.test(href)) {
    const opensNewTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
