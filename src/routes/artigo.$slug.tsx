import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getPost } from "@/lib/content.functions";

export const Route = createFileRoute("/artigo/$slug")({
  loader: async ({ params }) => {
    const post = await getPost({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Artigo"} — Maurício Godoi` },
      { name: "description", content: loaderData?.excerpt ?? "Artigo de Maurício Godoi." },
      { property: "og:title", content: loaderData?.title ?? "Artigo" },
      { property: "og:description", content: loaderData?.excerpt ?? "" },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArticlePage,
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center text-[#727272]">
      Não foi possível carregar este artigo.
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center text-[#727272]">Artigo não encontrado.</div>
  ),
});

function ArticlePage() {
  const post = Route.useLoaderData();
  return (
    <article className="bg-white">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <Link to="/insights" className="inline-flex items-center gap-2 text-sm text-[#727272] hover:text-[#16293A]">
          <ArrowLeft className="h-4 w-4" /> Voltar aos insights
        </Link>
        <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#727272]">
          {post.category} · {new Date(post.published_at).toLocaleDateString("pt-BR")}
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-[#16293A] sm:text-5xl">{post.title}</h1>
        {post.excerpt && <p className="mt-5 text-lg leading-relaxed text-[#727272]">{post.excerpt}</p>}
        {post.cover_url && (
          <img src={post.cover_url} alt={post.title} className="mt-10 w-full rounded-2xl object-cover" />
        )}
        <div
          className="prose prose-lg mt-10 max-w-none text-[#16293A] prose-headings:font-serif prose-a:text-[#16293A]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}