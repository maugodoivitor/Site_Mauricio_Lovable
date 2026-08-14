import { useState } from "react";
import { toast } from "sonner";
import { ImagePlus, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Props = { value: string | null; onChange: (url: string | null) => void; label?: string };

export function ImageUpload({ value, onChange, label = "Imagem de capa" }: Props) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file, {
        contentType: file.type,
        upsert: false,
      });
      if (error) throw error;
      onChange(`/api/public/media/${path}`);
      toast.success("Imagem enviada.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao enviar imagem.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#727272]">{label}</p>
      {value ? (
        <div className="relative inline-block">
          <img src={value} alt="Pré-visualização" className="h-32 w-56 rounded-lg object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute -right-2 -top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#16293A] text-white"
            aria-label="Remover imagem"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex h-32 w-56 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#16293A]/25 text-[#727272] transition-colors hover:border-[#16293A]/50">
          <ImagePlus className="h-5 w-5" />
          <span className="text-xs">{uploading ? "Enviando…" : "Enviar imagem"}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleFile(f);
            }}
          />
        </label>
      )}
    </div>
  );
}