import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="bg-[#16293A] text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">{eyebrow}</p>
        )}
        <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}