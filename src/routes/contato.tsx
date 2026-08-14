import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, Linkedin, MessageCircle, Instagram } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "../components/site/PageHero";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Maurício Godoi" },
      { name: "description", content: "Solicite um diagnóstico estratégico. Atendimento direto a empresas, conselhos e lideranças." },
      { property: "og:title", content: "Contato — Maurício Godoi" },
      { property: "og:description", content: "Formulário direto para diagnóstico estratégico." },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: ContatoPage,
});

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#727272]">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-[#16293A]/15 bg-white px-4 py-3 text-sm text-[#16293A] outline-none transition-colors focus:border-[#16293A]"
      />
    </label>
  );
}

function ContatoPage() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    setTimeout(() => {
      setSubmitting(false);
      form.reset();
      toast.success("Mensagem enviada. Retornaremos em até 48h úteis.");
    }, 600);
  };

  return (
    <>
      <PageHero
        eyebrow="Diagnóstico Estratégico"
        title="Vamos conversar sobre a decisão certa, no tempo certo."
        description="Preencha o formulário com o contexto da sua empresa. O retorno é direto, em até 48 horas úteis."
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:py-28">
          <form onSubmit={onSubmit} className="rounded-2xl border border-[#16293A]/10 bg-white p-7 sm:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nome" name="nome" required />
              <Field label="Empresa" name="empresa" required />
              <Field label="Cargo" name="cargo" />
              <Field label="E-mail corporativo" name="email" type="email" required />
              <Field label="Telefone" name="telefone" type="tel" />
              <Field label="Faturamento estimado" name="faturamento" placeholder="Opcional" />
            </div>
            <div className="mt-5">
              <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#727272]">
                Objetivo do contato
              </label>
              <textarea
                name="mensagem"
                required
                rows={5}
                className="mt-2 w-full rounded-xl border border-[#16293A]/15 bg-white px-4 py-3 text-sm text-[#16293A] outline-none transition-colors focus:border-[#16293A]"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-7 inline-flex items-center justify-center rounded-full bg-[#16293A] px-7 py-3 text-sm font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#0F1E2C] disabled:opacity-60"
            >
              {submitting ? "Enviando..." : "Solicitar Diagnóstico"}
            </button>
          </form>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-[#16293A] p-8 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">Contato direto</p>
              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <a href="mailto:mauricio@mauriciogodoi.com.br" className="inline-flex items-center gap-3 hover:underline">
                    <Mail className="h-4 w-4" /> mauricio@mauriciogodoi.com.br
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/5511915610022"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 hover:underline"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp (11) 91561-0022
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/maugodoi/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 hover:underline"
                  >
                    <Instagram className="h-4 w-4" /> @maugodoi
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/maugodoi/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 hover:underline">
                    <Linkedin className="h-4 w-4" /> LinkedIn Profissional
                  </a>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[#16293A]/10 p-8">
              <p className="font-serif text-xl text-[#16293A]">Atendimento</p>
              <p className="mt-3 text-sm leading-relaxed text-[#727272]">
                Empresas, conselhos de administração, family offices, escritórios jurídicos e instituições de ensino.
                Mentoria, consultoria, perícia, palestras e programas executivos sob medida.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}