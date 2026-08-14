import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo-mauricio-godoi.png.asset.json";

const links = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/metodo", label: "Método M.A.T.I.L.H.A.®" },
  { to: "/atuacao", label: "Eixos de Atuação" },
  { to: "/midia", label: "Na Mídia" },
  { to: "/insights", label: "Insights" },
  { to: "/contato", label: "Contato" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#16293A]/95 backdrop-blur supports-[backdrop-filter]:bg-[#16293A]/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:h-20">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center"
          aria-label="Maurício Godoi — página inicial"
        >
          <img
            src={logoAsset.url}
            alt="Logomarca Maurício Godoi"
            className="h-7 w-auto sm:h-8 lg:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="group relative text-[13px] font-medium uppercase tracking-[0.12em] text-white/75 transition-colors hover:text-white"
              activeProps={{ className: "text-white" }}
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Abrir menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-[#16293A] lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-5 py-3 sm:px-8">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: l.to === "/" }}
                  className="block py-3 text-sm font-medium uppercase tracking-[0.12em] text-white/75 transition-colors hover:text-white"
                  activeProps={{ className: "text-white" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}