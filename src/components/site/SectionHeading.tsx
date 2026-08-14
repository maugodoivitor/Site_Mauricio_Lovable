interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
}

export function SectionHeading({ eyebrow, title, description, align = "left", invert = false }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${invert ? "text-white/70" : "text-[#727272]"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-serif text-3xl leading-[1.05] sm:text-4xl lg:text-5xl ${eyebrow ? "mt-3" : ""} ${invert ? "text-white" : "text-[#16293A]"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${invert ? "text-white/80" : "text-[#727272]"}`}>
          {description}
        </p>
      )}
    </div>
  );
}