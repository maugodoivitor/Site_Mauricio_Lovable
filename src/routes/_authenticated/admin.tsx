import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PostsAdmin } from "@/components/admin/PostsAdmin";
import { InterviewsAdmin } from "@/components/admin/InterviewsAdmin";
import { UsersAdmin } from "@/components/admin/UsersAdmin";
import { ghostBtn } from "@/components/admin/adminUi";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Painel editorial — Maurício Godoi" },
      { name: "description", content: "Publicação de artigos e entrevistas do site institucional." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Painel editorial — Maurício Godoi" },
      { property: "og:description", content: "Gestão de conteúdo do site institucional." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"posts" | "interviews" | "users">("posts");
  const [state, setState] = useState<"loading" | "allowed" | "denied">("loading");
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return setState("denied");
      setEmail(user.email ?? null);
      const [staff, admin] = await Promise.all([
        supabase.rpc("is_staff", { _user_id: user.id }),
        supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }),
      ]);
      setIsAdmin(!admin.error && admin.data);
      setState(!staff.error && staff.data ? "allowed" : "denied");
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#727272]">Painel editorial</p>
            <h1 className="mt-2 font-serif text-3xl text-[#16293A]">Gestão de conteúdo</h1>
            {email && <p className="mt-1 text-xs text-[#727272]">{email}</p>}
          </div>
          <button className={ghostBtn} onClick={() => void signOut()}>Sair</button>
        </div>

        {state === "loading" && <p className="mt-12 text-sm text-[#727272]">Carregando…</p>}

        {state === "denied" && (
          <div className="mt-12 rounded-xl border border-[#16293A]/12 p-8">
            <h2 className="font-serif text-xl text-[#16293A]">Acesso ainda não liberado</h2>
            <p className="mt-2 text-sm text-[#727272]">
              Sua conta foi criada, mas ainda não possui permissão de editor. Solicite a liberação do perfil
              administrador para publicar artigos e entrevistas.
            </p>
          </div>
        )}

        {state === "allowed" && (
          <>
            <div className="mt-10 flex flex-wrap gap-2 border-b border-[#16293A]/12">
              {([
                ["posts", "Blog / Insights"],
                ["interviews", "Na Mídia"],
                isAdmin ? ["users", "Acesso"] : null,
              ] as const)
                .filter((item): item is ["posts" | "interviews" | "users", string] => item !== null)
                .map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    className={`-mb-px border-b-2 px-4 py-3 text-sm transition-colors ${
                      tab === key
                        ? "border-[#16293A] font-medium text-[#16293A]"
                        : "border-transparent text-[#727272] hover:text-[#16293A]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
            </div>
            <div className="mt-10">
              {tab === "posts" ? <PostsAdmin /> : tab === "interviews" ? <InterviewsAdmin /> : <UsersAdmin />}
            </div>
          </>
        )}
      </div>
    </section>
  );
}