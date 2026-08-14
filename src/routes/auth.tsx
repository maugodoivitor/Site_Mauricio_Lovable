import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Acesso restrito — Maurício Godoi" },
      { name: "description", content: "Área de acesso restrito para publicação de conteúdo editorial." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Acesso restrito — Maurício Godoi" },
      { property: "og:description", content: "Painel editorial do site institucional." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin", replace: true });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin", data: { full_name: name } },
        });
        if (error) throw error;
        if (data.session) navigate({ to: "/admin", replace: true });
        else toast.success("Conta criada. Confirme o e-mail enviado para concluir o acesso.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Não foi possível concluir.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Falha ao entrar com Google.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/admin", replace: true });
  }

  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-white px-5 py-20">
      <div className="w-full max-w-md rounded-2xl border border-[#16293A]/12 p-8 sm:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#727272]">Área restrita</p>
        <h1 className="mt-3 font-serif text-3xl text-[#16293A]">
          {mode === "signin" ? "Entrar no painel" : "Criar acesso"}
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {mode === "signup" && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome completo"
              className="w-full rounded-lg border border-[#16293A]/15 px-4 py-3 text-sm text-[#16293A] outline-none focus:border-[#16293A]"
            />
          )}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="w-full rounded-lg border border-[#16293A]/15 px-4 py-3 text-sm text-[#16293A] outline-none focus:border-[#16293A]"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full rounded-lg border border-[#16293A]/15 px-4 py-3 text-sm text-[#16293A] outline-none focus:border-[#16293A]"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#16293A] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Aguarde…" : mode === "signin" ? "Entrar" : "Criar conta"}
          </button>
        </form>
        <button
          onClick={handleGoogle}
          className="mt-3 w-full rounded-lg border border-[#16293A]/20 px-5 py-3 text-sm font-medium text-[#16293A] transition-colors hover:bg-[#16293A]/5"
        >
          Entrar com Google
        </button>
        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 w-full text-center text-xs text-[#727272] underline underline-offset-4"
        >
          {mode === "signin" ? "Não tem acesso? Criar conta" : "Já tenho acesso"}
        </button>
      </div>
    </section>
  );
}