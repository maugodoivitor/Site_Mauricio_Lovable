import { createFileRoute } from "@tanstack/react-router";
import { Target, Briefcase, Mic, Scale, GraduationCap, Users } from "lucide-react";
import { PageHero } from "../components/site/PageHero";
import { FeatureCard } from "../components/site/FeatureCard";

export const Route = createFileRoute("/atuacao")({
  head: () => ({
    meta: [
      { title: "Eixos de Atuação — Maurício Godoi" },
      { name: "description", content: "Mentoria estratégica, consultoria empresarial, palestras, perícia judicial, educação executiva e conselho consultivo." },
      { property: "og:title", content: "Eixos de Atuação — Maurício Godoi" },
      { property: "og:description", content: "Seis frentes de atuação para empresas e lideranças que decidem em cenários complexos." },
      { property: "og:url", content: "/atuacao" },
    ],
    links: [{ rel: "canonical", href: "/atuacao" }],
  }),
  component: AtuacaoPage,
});

const services = [
  { icon: Target, eyebrow: "01", title: "Mentoria Estratégica M.A.T.I.L.H.A.®", description: "Organização financeira e suporte consultivo contínuo para empresários retomarem o controle estratégico do negócio." },
  { icon: Briefcase, eyebrow: "02", title: "Consultoria Empresarial", description: "FP&A, reestruturação corporativa e captação de recursos via CRI, debêntures e linhas BNDES. Foco em previsibilidade." },
  { icon: Mic, eyebrow: "03", title: "Palestras Estratégicas", description: "Análise de ciclos econômicos, juros, inflação e tomada de decisão sob cenários de incerteza para conselhos e lideranças." },
  { icon: Scale, eyebrow: "04", title: "Perícia Judicial e Assistência Técnica", description: "Rigor técnico e econômico para tribunais, conselhos administrativos e defesas sobre impactos regulatórios e contratuais." },
  { icon: GraduationCap, eyebrow: "05", title: "Educação Executiva", description: "Curadoria de temas críticos para C-Levels e formação de lideranças de alta performance em programas customizados." },
  { icon: Users, eyebrow: "06", title: "Conselheiro Consultivo", description: "Atuação em conselhos consultivos e de administração, trazendo visão econômica independente, governança e apoio à tomada de decisão de alta complexidade." },
];

function AtuacaoPage() {
  return (
    <>
      <PageHero
        eyebrow="Serviços"
        title="Seis frentes para decisões econômicas que se sustentam."
        description="Um portfólio integrado: do diagnóstico estratégico contínuo à atuação técnica em tribunais, conselhos e formação de lideranças."
      />
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <FeatureCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}