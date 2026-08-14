import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../components/site/PageHero";
import { CTAButton } from "../components/site/CTAButton";

export const Route = createFileRoute("/metodo")({
  head: () => ({
    meta: [
      { title: "Método M.A.T.I.L.H.A.® — Maurício Godoi" },
      { name: "description", content: "Os 7 pilares do método M.A.T.I.L.H.A.®: mapeamento, alinhamento, trajetória financeira, implantação, liderança, escala e adaptação contínua." },
      { property: "og:title", content: "Método M.A.T.I.L.H.A.® — Maurício Godoi" },
      { property: "og:description", content: "Os 7 pilares da M.A.T.I.L.H.A.® — liderança estratégica não nasce do improviso. Nasce da visão." },
      { property: "og:url", content: "/metodo" },
    ],
    links: [{ rel: "canonical", href: "/metodo" }],
  }),
  component: MetodoPage,
});

const pillars = [
  { letter: "M", n: "01", title: "Mapeamento Estratégico", body: "Diagnóstico profundo do negócio" },
  { letter: "A", n: "02", title: "Alinhamento de Liderança", body: "Cultura que executa sem o dono" },
  { letter: "T", n: "03", title: "Trajetória Financeira", body: "Previsibilidade de caixa e lucro" },
  { letter: "I", n: "04", title: "Implantação & IA", body: "Processos e inteligência operacional" },
  { letter: "L", n: "05", title: "Liderança de Resultados", body: "KPIs que movem o negócio" },
  { letter: "H", n: "06", title: "Horizonte de Escala", body: "Crescer 10x sem colapsar" },
  { letter: "A", n: "07", title: "Adaptação Contínua", body: "1% melhor todo dia" },
];

function MetodoPage() {
  return (
    <>
      <PageHero
        eyebrow="Método Proprietário"
        title="M.A.T.I.L.H.A.®"
        description="Liderança estratégica não nasce do improviso. Nasce da visão."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-28">
          <p className="font-serif text-2xl leading-relaxed text-[#16293A] sm:text-3xl">
            O método M.A.T.I.L.H.A.® é a consolidação de duas décadas de prática e pesquisa em torno de uma tese:
            <span className="text-[#727272]"> empresas dependentes do fundador não escalam — adoecem.</span>
          </p>
          <p className="mt-6 leading-relaxed text-[#727272]">
            O framework instala uma arquitetura de decisão que substitui governanças excessivamente centradas no
            fundador por estruturas previsíveis, financeiramente sustentáveis e operacionalmente eficientes. Ele
            articula quatro pilares interdependentes — Estratégia, Finanças, Processos e Liderança — em ciclos
            curtos de diagnóstico, execução e revisão.
          </p>
        </div>
      </section>

      <section className="bg-[#16293A]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C9A54A]">O Método</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl">
            Os 7 Pilares da M.A.T.I.L.H.A.
          </h2>
          <div className="mt-6 h-px w-24 bg-[#C9A54A]" />

          <ul className="mt-12 space-y-3">
            {pillars.map((p) => (
              <li
                key={p.n}
                className="group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-5 gap-y-1 border-l-2 border-[#C9A54A]/70 bg-white/[0.03] px-5 py-5 transition-colors duration-300 hover:border-[#C9A54A] hover:bg-white/[0.07] sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:px-8"
              >
                <span className="shrink-0 font-serif text-4xl text-[#C9A54A] sm:w-14 sm:text-5xl">
                  {p.letter}
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C9A54A]/80">
                    Pilar {p.n}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-white sm:text-xl">{p.title}</h3>
                  <p className="mt-1 text-sm text-white/60">{p.body}</p>
                </div>
                <span className="hidden font-serif text-2xl text-white/15 sm:block">{p.n}</span>
              </li>
            ))}
          </ul>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/15 bg-white/5 px-8 py-10 text-white sm:px-12">
            <p className="max-w-xl font-serif text-2xl leading-tight">
              Quer entender como o método se aplica à sua operação?
            </p>
            <CTAButton to="https://api.whatsapp.com/send/?phone=5511915610022&text=Ol%C3%A1+Maur%C3%ADcio%2C+quero+aplicar+a+Mentoria+M.A.T.I.L.H.A.+no+meu+neg%C3%B3cio.&type=phone_number&app_absent=0">
              Conversar com Maurício
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}