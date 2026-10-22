import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * Variantes:
 * - liquid: CTA principal "liquid glass" com tom ciano (fundo escuro)
 * - liquid-clear: glass neutro (secundário em fundo escuro)
 * - liquid-light: glass sobre fundo claro (texto navy)
 * - navy / white / outline-light / outline-dark / wa: sólidos, para casos pontuais
 */
export type ButtonVariant = "liquid" | "liquid-clear" | "liquid-light" | "navy" | "white" | "outline-light" | "outline-dark" | "wa";
type ButtonSize = "md" | "lg";

interface ButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
}

export const BUTTON_BASE =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap " +
  "transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-out " +
  "hover:scale-[1.03] active:scale-[0.97] motion-reduce:hover:scale-100";

export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  liquid: "btn-liquid btn-liquid--cyan",
  "liquid-clear": "btn-liquid btn-liquid--clear",
  "liquid-light": "btn-liquid btn-liquid--light",
  navy: "bg-navy text-white hover:bg-navy-soft hover:shadow-lift",
  white: "bg-white text-navy hover:bg-ice hover:shadow-lift",
  "outline-light": "border border-white/30 text-white hover:border-cyan hover:bg-white/5 hover:text-cyan-light",
  "outline-dark": "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white",
  wa: "bg-wa text-navy-deep hover:brightness-110 hover:shadow-[0_12px_36px_-12px_rgb(37_211_102/0.6)]",
};

export const BUTTON_SIZES: Record<ButtonSize, string> = {
  md: "min-h-12 px-6 text-[15px]",
  lg: "min-h-14 px-8 text-base",
};

const EXTERNAL_PATTERN = /^(https?:|mailto:|tel:)/;

export function buttonClasses(variant: ButtonVariant = "liquid", size: ButtonSize = "md", className = ""): string {
  return `${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${BUTTON_SIZES[size]} ${className}`;
}

/** Link com cara de botão (todos os CTAs da LP são navegação). */
export function Button({
  href,
  variant = "liquid",
  size = "md",
  icon,
  iconPosition = "end",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = buttonClasses(variant, size, className);
  const iconNode = icon ? (
    <span
      aria-hidden="true"
      className={`relative z-10 ${iconPosition === "end" ? "transition-transform duration-300 group-hover:translate-x-1" : ""}`}
    >
      {icon}
    </span>
  ) : null;
  const content = (
    <>
      {iconPosition === "start" && iconNode}
      <span className="relative z-10">{children}</span>
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
