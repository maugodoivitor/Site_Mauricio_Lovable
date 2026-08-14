import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Play } from "lucide-react";
import { PageHero } from "../components/site/PageHero";
import { listInterviews } from "@/lib/content.functions";

type InterviewCard = Awaited<ReturnType<typeof listInterviews>>[number];

export const Route = createFileRoute("/midia")({
  loader: () => listInterviews(),
  head: () => ({
    meta: [
      { title: "Na Mídia — Maurício Godoi" },
      { name: "description", content: "Presença e análise estratégica nos principais veículos de comunicação do país." },
      { property: "og:title", content: "Na Mídia — Maurício Godoi" },
      { property: "og:description", content: "Clipping curado: G1, Estadão, DCI, Estado de Minas, UOL Economia e Metrópoles." },
      { property: "og:url", content: "/midia" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/midia" }],
  }),
  component: MidiaPage,
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center text-[#727272]">
      Não foi possível carregar as entrevistas agora.
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center text-[#727272]">Conteúdo não encontrado.</div>
  ),
});

const outlets = ["G1", "Estadão", "DCI", "Estado de Minas", "UOL Economia", "Metrópoles"];

function MidiaPage() {
  const interviews = Route.useLoaderData();
  return (
    <>
      <PageHero
        eyebrow="Clipping Curado"
        title="Presença e Análise Estratégica na Mídia"
        description="Comentários e análises em economia, sistema financeiro, juros e ciclos macroeconômicos em veículos de referência nacional."
      />
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {outlets.map((o) => (
              <div
                key={o}
                className="flex aspect-[3/2] items-center justify-center rounded-xl border border-[#16293A]/15 bg-white text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#16293A]/40"
              >
                <span className="font-serif text-lg text-[#16293A] sm:text-xl">{o}</span>
              </div>
            ))}
          </div>
          <div className="mt-20">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#727272]">Destaque em vídeo</p>
            <a
              href="https://www.youtube.com/watch?v=zM1ErlzsG8M"
              target="_blank"
              rel="noreferrer"
              className="group mt-6 block overflow-hidden rounded-2xl bg-[#16293A] text-white transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-[#16293A] via-[#1E3447] to-[#16293A]">
                <span className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-[#16293A]">
                  <Play className="h-7 w-7 translate-x-0.5 fill-current" />
                </span>
              </div>
              <div className="p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">TC Mercados · MRT News</p>
                <h3 className="mt-3 font-serif text-2xl leading-tight sm:text-3xl">
                  Análise de Cenário e Sistema Financeiro no TC Mercados
                </h3>
              </div>
            </a>
            <div className="mt-8 text-center">
              <a
                href="https://www.google.com/search?sca_esv=c22c990d6aa7f981&rlz=1C1FKPE_pt-PTBR1174BR1174&sxsrf=APpeQntkykEQMtrvPKMbTr2SursVKfiWeA:1786377186122&udm=7&fbs=ABfTbFVGaQeaqnsRPI5sOMG32KszkLt6nAp8aiRKj5vMjqZApKYr2wv-EHakX1SS4JF8fY35uG3Kw9VJTmtVkGHFG6Eqvi9nuTMP6gpmJlswrgnG-3pdJZi8zPtLIMFUngeym0NNV_63N6zT5HZj9RSzKTbgavYgEfEu43itMZ4o_IFfnJks0sEXdnJcnyB2NIu1xobP01k3ALHpvrTGiBDmaTIB5u5cAg&q=mauricio+godoi&sa=X&ved=2ahUKEwi-gPTMtZaWAxXmrJUCHddhOLIQtKgLegQIEBAB&biw=1920&bih=945&dpr=1#ip=1"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#16293A] underline-offset-4 transition-colors hover:underline"
              >
                Ver mais mídias no Google
              </a>
            </div>
            {interviews.length > 0 && (
              <div className="mt-20">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#727272]">
                  Entrevistas e participações
                </p>
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {interviews.map((item: InterviewCard) => (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex h-full flex-col rounded-2xl border border-[#16293A]/10 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#16293A]/30"
                    >
                      {item.thumbnail_url && (
                        <img
                          src={item.thumbnail_url}
                          alt={item.title}
                          loading="lazy"
                          className="mb-5 aspect-[16/9] w-full rounded-xl object-cover"
                        />
                      )}
                      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-[#727272]">
                        <span>{item.outlet}</span>
                        <span>{new Date(item.published_at).toLocaleDateString("pt-BR")}</span>
                      </div>
                      <h3 className="mt-4 font-serif text-xl leading-tight text-[#16293A]">{item.title}</h3>
                      {item.description && (
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-[#727272]">{item.description}</p>
                      )}
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#16293A]">
                        Acessar
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}