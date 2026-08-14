import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon?: LucideIcon;
  eyebrow?: string;
  title: string;
  description: string;
  invert?: boolean;
}

export function FeatureCard({ icon: Icon, eyebrow, title, description, invert = false }: FeatureCardProps) {
  const base = invert
    ? "border-white/15 bg-white/5 text-white hover:border-white/35 hover:bg-white/10"
    : "border-[#16293A]/10 bg-white text-[#16293A] hover:border-[#16293A]/30 hover:-translate-y-1";

  return (
    <div className={`group h-full rounded-2xl border p-7 transition-all duration-300 ${base}`}>
      {Icon && (
        <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${invert ? "bg-white/10 text-white" : "bg-[#16293A] text-white"}`}>
          <Icon className="h-5 w-5" />
        </div>
      )}
      {eyebrow && (
        <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${invert ? "text-white/65" : "text-[#727272]"}`}>
          {eyebrow}
        </p>
      )}
      <h3 className={`mt-2 font-serif text-2xl leading-tight ${invert ? "text-white" : "text-[#16293A]"}`}>
        {title}
      </h3>
      <p className={`mt-3 text-sm leading-relaxed ${invert ? "text-white/75" : "text-[#727272]"}`}>
        {description}
      </p>
    </div>
  );
}