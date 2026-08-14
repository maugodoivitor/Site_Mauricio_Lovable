import { createFileRoute } from "@tanstack/react-router";
import { LineChart, Landmark, GraduationCap } from "lucide-react";
import { CTAButton } from "../components/site/CTAButton";
import { FeatureCard } from "../components/site/FeatureCard";
import { SectionHeading } from "../components/site/SectionHeading";
import portrait from "../assets/mauricio-godoi.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maurício Godoi — Estratégia, Economia e Governança" },
      { name: "description", content: "Economista, conselheiro e estrategista empresarial. Decisões de alta complexidade ancoradas em viabilidade econômica." },
      { property: "og:title", content: "Maurício Godoi — Estratégia, Economia e Governança" },
      { property: "og:description", content: "A tríplice convergência entre mercado, instituição e academia para empresas de alta performance." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#16293A] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
              Estratégia · Economia · Governança
            </p>
            <h1 className="mt-5 font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-[3.6rem]">
              Decisões de Alta Complexidade Exigem Soluções Ancoradas em Viabilidade Econômica, Não em Teoria de Gestão.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Maurício Godoi une a vivência prática da mesa de operações, o rigor institucional do Senado Federal e a bagagem de professor de MBA das maiores escolas de negócios do país.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <CTAButton to="https://calendly.com/maugodoi/sessao-diagnostico-matilha-gratuita">Agendar Diagnóstico Estratégico</CTAButton>
              <CTAButton to="/metodo" variant="ghost">Conhecer o Método</CTAButton>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-3 hidden rounded-[2rem] border border-white/15 lg:block" />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/[0.02]">
              <img
                src={portrait.url}
                alt="Maurício Godoi, economista, conselheiro e estrategista empresarial"
                className="h-full w-full object-cover object-top"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#16293A] via-[#16293A]/25 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
                <p className="font-serif text-lg text-white/90">Maurício Godoi</p>
                <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                  Economista · Conselheiro · Professor
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tríplice Convergência */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <SectionHeading
            eyebrow="Tríplice Convergência"
            title="A convergência rara entre mercado, instituição e academia."
            description="Três frentes que, combinadas, produzem decisões mais rápidas, mais seguras e economicamente viáveis."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={LineChart}
              eyebrow="01 · Mercado"
              title="Experiência de Mercado"
              description="Passagem por bancos e corretoras. Base analítica, velocidade de execução e cultura de segurança operacional."
            />
            <FeatureCard
              icon={Landmark}
              eyebrow="02 · Instituição"
              title="Rigor Institucional"
              description="Conselheiro técnico e voluntário no Senado Federal — CPI dos Cartões e Conselho Municipal. Disciplina e responsabilidade pública."
            />
            <FeatureCard
              icon={GraduationCap}
              eyebrow="03 · Academia"
              title="Academia de Elite"
              description="Professor e formador de C-Levels na FIA, Saint Paul e USP/Esalq. Conexão direta entre teoria, pesquisa e prática."
            />
          </div>
        </div>
      </section>

      {/* Call-to-action band */}
      <section className="bg-[#F4F5F6]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h3 className="font-serif text-3xl leading-tight text-[#16293A] sm:text-4xl">
              Pronto para retomar o controle estratégico da sua empresa?
            </h3>
            <p className="mt-3 text-[#727272]">
              Agende um diagnóstico estratégico e identifique, com método, os pontos de inflexão do seu negócio.
            </p>
          </div>
          <CTAButton to="/contato" variant="outline">Solicitar diagnóstico</CTAButton>
        </div>
      </section>
    </>
  );
}
