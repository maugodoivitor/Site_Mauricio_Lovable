export const inputClass =
  "w-full rounded-lg border border-[#16293A]/15 px-4 py-3 text-sm text-[#16293A] outline-none focus:border-[#16293A]";

export const primaryBtn =
  "rounded-lg bg-[#16293A] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60";

export const ghostBtn =
  "inline-flex items-center rounded-lg border border-[#16293A]/20 px-3 py-2 text-sm text-[#16293A] transition-colors hover:bg-[#16293A]/5";

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}