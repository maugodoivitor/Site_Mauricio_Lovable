import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../components/site/PageHero";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Maurício Godoi" },
      { name: "description", content: "Trajetória: do mestrado e doutorado em economia à mesa de operações, ao Senado Federal e às maiores escolas de negócios do Brasil." },
      { property: "og:title", content: "Sobre — Maurício Godoi" },
      { property: "og:description", content: "A construção do elo entre base acadêmica sólida e aplicação real no mercado." },
      { property: "og:url", content: "/sobre" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: SobrePage,
});

const milestones = [
  {
    period: "Acadêmico",
    title: "Mestrado em Economia",
    body: "Base teórica robusta em macroeconomia, finanças corporativas e capacidades dinâmicas, com produção acadêmica aplicada a problemas reais de empresas.",
  },
  {
    period: "Mercado",
    title: "Mesa de Operações: Bancos e Corretoras",
    body: "Experiência prática em risco, liquidez e tomada de decisão sob pressão. Aqui se formou a leitura ágil de ciclos econômicos e cenários de juros.",
  },
  {
    period: "Instituição",
    title: "Conselheiro Técnico — CPI dos Cartões de Crédito, Senado Federal",
    body: "Atuação técnica e voluntária em uma das mais relevantes investigações sobre o sistema de meios de pagamento, fornecendo análises econômicas para a relatoria.",
  },
  {
    period: "Academia",
    title: "Professor de Finanças e Macroeconomia",
    body: "Docência na Saint Paul Escola de Negócios, FIA Online e USP/Esalq, formando C-Levels e quadros de alta gestão para decisões em cenários complexos.",
  },
  {
    period: "Pesquisa Aplicada",
    title: "Capacidades Dinâmicas e Transformação Digital",
    body: "Desenvolvedor de frameworks de capacidades dinâmicas aplicados a grandes instituições em processos de transformação digital e reestruturação organizacional.",
  },
];

function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow="Trajetória"
        title="Do rigor acadêmico à mesa de decisão estratégica."
        description="Uma carreira construída no encontro entre pesquisa econômica de fronteira, prática de mercado e responsabilidade institucional."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-28">
          <ol className="relative space-y-12 border-l border-[#16293A]/15 pl-8 sm:pl-12">
            {milestones.map((m, i) => (
              <li key={m.title} className="relative">
                <span className="absolute -left-[37px] flex h-6 w-6 items-center justify-center rounded-full bg-[#16293A] text-[10px] font-semibold text-white sm:-left-[49px] sm:h-8 sm:w-8 sm:text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#727272]">
                  {m.period}
                </p>
                <h3 className="mt-2 font-serif text-2xl leading-tight text-[#16293A] sm:text-3xl">
                  {m.title}
                </h3>
                <p className="mt-3 max-w-2xl text-[#727272] leading-relaxed">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}