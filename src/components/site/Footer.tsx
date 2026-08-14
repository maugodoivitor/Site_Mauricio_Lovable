import { Link } from "@tanstack/react-router";
import { Linkedin, Mail, MessageCircle, Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import logoAsset from "@/assets/logo-mauricio-godoi.png.asset.json";

export function Footer() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (active) setSignedIn(!!data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(!!session);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <footer className="bg-[#727272] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3 lg:py-16">
        <div>
          <img
            src={logoAsset.url}
            alt="Logomarca Maurício Godoi"
            className="h-9 w-auto"
          />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/80">
            Estratégia, economia e governança para decisões empresariais de alta complexidade.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Contato</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href="mailto:mauricio@mauriciogodoi.com.br"
                className="inline-flex items-center gap-2 text-white/90 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" /> mauricio@mauriciogodoi.com.br
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/5511915610022"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white/90 transition-colors hover:text-white"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp (11) 91561-0022
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Conecte-se</p>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/maugodoi/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn de Maurício Godoi"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-[#16293A]"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/maugodoi/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de Maurício Godoi"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-[#16293A]"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/80">
            <Link to="/sobre" className="hover:text-white">Sobre</Link>
            <Link to="/metodo" className="hover:text-white">Método</Link>
            <Link to="/atuacao" className="hover:text-white">Atuação</Link>
            <Link to="/contato" className="hover:text-white">Contato</Link>
            <Link
              to={signedIn ? "/admin" : "/auth"}
              className="text-white/60 hover:text-white"
            >
              {signedIn ? "Painel editorial" : "Área restrita"}
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-7xl px-5 py-5 text-xs text-white/80 sm:px-8">
          Maurício Godoi © 2026 — Estratégia, Economia e Governança.
        </div>
      </div>
    </footer>
  );
}