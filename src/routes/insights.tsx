import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "../components/site/PageHero";
import { listPosts } from "@/lib/content.functions";

type PostCard = Awaited<ReturnType<typeof listPosts>>[number];

export const Route = createFileRoute("/insights")({
  loader: () => listPosts(),
  head: () => ({
    meta: [
      { title: "Insights — Maurício Godoi" },
      { name: "description", content: "Capital intelectual em economia, governança e transformação corporativa." },
      { property: "og:title", content: "Insights — Maurício Godoi" },
      { property: "og:description", content: "Artigos sobre Selic, crédito imobiliário, governança e capacidades dinâmicas." },
      { property: "og:url", content: "/insights" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/insights" }],
  }),
  component: InsightsPage,
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center text-[#727272]">
      Não foi possível carregar os artigos agora.
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center text-[#727272]">Conteúdo não encontrado.</div>
  ),
});

function InsightsPage() {
  const posts = Route.useLoaderData();
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Capital intelectual aplicado."
        description="Análises e ensaios que atravessam economia, governança e estratégia corporativa."
      />
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          {posts.length === 0 && (
            <p className="text-center text-sm text-[#727272]">
              Novos artigos serão publicados em breve.
            </p>
          )}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p: PostCard) => (
              <Link
                key={p.id}
                to="/artigo/$slug"
                params={{ slug: p.slug }}
                className="group flex h-full flex-col rounded-2xl border border-[#16293A]/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#16293A]/30"
              >
                {p.cover_url && (
                  <img
                    src={p.cover_url}
                    alt={p.title}
                    loading="lazy"
                    className="mb-5 aspect-[16/9] w-full rounded-xl object-cover"
                  />
                )}
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-[#727272]">
                  <span>{p.category}</span>
                  <span>{new Date(p.published_at).toLocaleDateString("pt-BR")}</span>
                </div>
                <h3 className="mt-5 font-serif text-2xl leading-tight text-[#16293A]">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#727272]">{p.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#16293A]">
                  Ler artigo
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}