import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { RichTextEditor } from "./RichTextEditor";
import { ImageUpload } from "./ImageUpload";
import { slugify, inputClass, primaryBtn, ghostBtn } from "./adminUi";

type Post = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  cover_url: string | null;
  published: boolean;
  published_at: string;
};

const empty = {
  slug: "",
  title: "",
  category: "Análise",
  excerpt: "",
  content: "",
  cover_url: null as string | null,
  published: true,
  published_at: new Date().toISOString().slice(0, 10),
};

export function PostsAdmin() {
  const [items, setItems] = useState<Post[]>([]);
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("published_at", { ascending: false });
    if (error) toast.error(error.message);
    else setItems((data ?? []) as Post[]);
  }

  useEffect(() => {
    void load();
  }, []);

  function startNew() {
    setForm({ ...empty });
    setEditing("new");
  }

  function startEdit(p: Post) {
    setForm({
      slug: p.slug,
      title: p.title,
      category: p.category,
      excerpt: p.excerpt,
      content: p.content,
      cover_url: p.cover_url,
      published: p.published,
      published_at: p.published_at.slice(0, 10),
    });
    setEditing(p.id);
  }

  async function save() {
    if (!form.title.trim()) return toast.error("Informe o título.");
    setSaving(true);
    const payload = {
      ...form,
      slug: (form.slug || slugify(form.title)).trim(),
      published_at: new Date(form.published_at).toISOString(),
    };
    const { error } =
      editing === "new"
        ? await supabase.from("posts").insert(payload)
        : await supabase.from("posts").update(payload).eq("id", editing!);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Artigo salvo.");
    setEditing(null);
    void load();
  }

  async function remove(id: string) {
    if (!window.confirm("Excluir este artigo?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Artigo excluído.");
    void load();
  }

  if (editing) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-[#16293A]">
            {editing === "new" ? "Novo artigo" : "Editar artigo"}
          </h2>
          <button className={ghostBtn} onClick={() => setEditing(null)}>Voltar</button>
        </div>
        <input
          className={inputClass}
          placeholder="Título"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <input
            className={inputClass}
            placeholder="Categoria"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            className={inputClass}
            placeholder="slug-do-artigo"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />
          <input
            type="date"
            className={inputClass}
            value={form.published_at}
            onChange={(e) => setForm({ ...form, published_at: e.target.value })}
          />
        </div>
        <textarea
          className={`${inputClass} min-h-[80px]`}
          placeholder="Resumo exibido na listagem"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
        />
        <ImageUpload value={form.cover_url} onChange={(url) => setForm({ ...form, cover_url: url })} />
        <RichTextEditor value={form.content} onChange={(html) => setForm({ ...form, content: html })} />
        <label className="flex items-center gap-2 text-sm text-[#16293A]">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          Publicado no site
        </label>
        <button className={primaryBtn} disabled={saving} onClick={() => void save()}>
          {saving ? "Salvando…" : "Salvar artigo"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-[#16293A]">Artigos do blog</h2>
        <button className={primaryBtn} onClick={startNew}>
          <Plus className="mr-2 inline h-4 w-4" />Novo artigo
        </button>
      </div>
      {items.length === 0 && <p className="text-sm text-[#727272]">Nenhum artigo publicado ainda.</p>}
      <ul className="divide-y divide-[#16293A]/10 rounded-xl border border-[#16293A]/12">
        {items.map((p) => (
          <li key={p.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="min-w-0">
              <p className="truncate font-medium text-[#16293A]">{p.title}</p>
              <p className="mt-1 text-xs text-[#727272]">
                {p.category} · {new Date(p.published_at).toLocaleDateString("pt-BR")} ·{" "}
                {p.published ? "publicado" : "rascunho"}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button className={ghostBtn} onClick={() => startEdit(p)} aria-label="Editar"><Pencil className="h-4 w-4" /></button>
              <button className={ghostBtn} onClick={() => void remove(p.id)} aria-label="Excluir"><Trash2 className="h-4 w-4" /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}