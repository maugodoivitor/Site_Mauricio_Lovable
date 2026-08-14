import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "./ImageUpload";
import { inputClass, primaryBtn, ghostBtn } from "./adminUi";

type Interview = {
  id: string;
  title: string;
  outlet: string;
  kind: string;
  url: string;
  description: string;
  thumbnail_url: string | null;
  published: boolean;
  published_at: string;
};

const empty = {
  title: "",
  outlet: "",
  kind: "video",
  url: "",
  description: "",
  thumbnail_url: null as string | null,
  published: true,
  published_at: new Date().toISOString().slice(0, 10),
};

export function InterviewsAdmin() {
  const [items, setItems] = useState<Interview[]>([]);
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data, error } = await supabase
      .from("interviews")
      .select("*")
      .order("published_at", { ascending: false });
    if (error) toast.error(error.message);
    else setItems((data ?? []) as Interview[]);
  }

  useEffect(() => {
    void load();
  }, []);

  async function save() {
    if (!form.title.trim()) return toast.error("Informe o título.");
    setSaving(true);
    const payload = { ...form, published_at: new Date(form.published_at).toISOString() };
    const { error } =
      editing === "new"
        ? await supabase.from("interviews").insert(payload)
        : await supabase.from("interviews").update(payload).eq("id", editing!);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Entrevista salva.");
    setEditing(null);
    void load();
  }

  async function remove(id: string) {
    if (!window.confirm("Excluir esta entrevista?")) return;
    const { error } = await supabase.from("interviews").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Entrevista excluída.");
    void load();
  }

  if (editing) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-[#16293A]">
            {editing === "new" ? "Nova entrevista" : "Editar entrevista"}
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
            placeholder="Veículo (ex.: G1)"
            value={form.outlet}
            onChange={(e) => setForm({ ...form, outlet: e.target.value })}
          />
          <select
            className={inputClass}
            value={form.kind}
            onChange={(e) => setForm({ ...form, kind: e.target.value })}
          >
            <option value="video">Vídeo</option>
            <option value="materia">Matéria</option>
            <option value="podcast">Podcast</option>
          </select>
          <input
            type="date"
            className={inputClass}
            value={form.published_at}
            onChange={(e) => setForm({ ...form, published_at: e.target.value })}
          />
        </div>
        <input
          className={inputClass}
          placeholder="Link (https://…)"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
        />
        <textarea
          className={`${inputClass} min-h-[80px]`}
          placeholder="Descrição breve"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <ImageUpload
          label="Miniatura"
          value={form.thumbnail_url}
          onChange={(url) => setForm({ ...form, thumbnail_url: url })}
        />
        <label className="flex items-center gap-2 text-sm text-[#16293A]">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          Publicada no site
        </label>
        <button className={primaryBtn} disabled={saving} onClick={() => void save()}>
          {saving ? "Salvando…" : "Salvar entrevista"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-[#16293A]">Entrevistas e mídia</h2>
        <button
          className={primaryBtn}
          onClick={() => {
            setForm({ ...empty });
            setEditing("new");
          }}
        >
          <Plus className="mr-2 inline h-4 w-4" />Nova entrevista
        </button>
      </div>
      {items.length === 0 && <p className="text-sm text-[#727272]">Nenhuma entrevista cadastrada ainda.</p>}
      <ul className="divide-y divide-[#16293A]/10 rounded-xl border border-[#16293A]/12">
        {items.map((i) => (
          <li key={i.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="min-w-0">
              <p className="truncate font-medium text-[#16293A]">{i.title}</p>
              <p className="mt-1 text-xs text-[#727272]">
                {i.outlet} · {new Date(i.published_at).toLocaleDateString("pt-BR")} ·{" "}
                {i.published ? "publicada" : "rascunho"}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                className={ghostBtn}
                aria-label="Editar"
                onClick={() => {
                  setForm({
                    title: i.title,
                    outlet: i.outlet,
                    kind: i.kind,
                    url: i.url,
                    description: i.description,
                    thumbnail_url: i.thumbnail_url,
                    published: i.published,
                    published_at: i.published_at.slice(0, 10),
                  });
                  setEditing(i.id);
                }}
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button className={ghostBtn} onClick={() => void remove(i.id)} aria-label="Excluir"><Trash2 className="h-4 w-4" /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}