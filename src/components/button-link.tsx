import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon = true,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light";
  icon?: boolean;
  className?: string;
}) {
  return (
    <Link className={`button button--${variant} ${className}`} href={href}>
      <span>{children}</span>
      {icon && <ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" />}
    </Link>
  );
}
