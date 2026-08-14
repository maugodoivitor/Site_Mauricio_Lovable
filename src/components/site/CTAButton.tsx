import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

interface CTAButtonProps {
  to: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
}

export function CTAButton({ to, children, variant = "primary" }: CTAButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-white text-[#16293A] hover:bg-white/90"
      : variant === "outline"
      ? "border border-[#16293A] text-[#16293A] hover:bg-[#16293A] hover:text-white"
      : "border border-white/30 text-white hover:bg-white hover:text-[#16293A]";

  const className = `group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium uppercase tracking-[0.14em] transition-all duration-300 ${styles}`;
  const isExternal = /^https?:\/\//.test(to);

  if (isExternal) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    );
  }

  return (
    <Link to={to} className={className}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}