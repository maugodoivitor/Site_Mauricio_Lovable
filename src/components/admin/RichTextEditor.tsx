import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import { Bold, Italic, List, ListOrdered, Heading2, Quote, Link2, Undo2, Redo2 } from "lucide-react";

type Props = { value: string; onChange: (html: string) => void };

export function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false })],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[280px] px-4 py-3 focus:outline-none text-[#16293A]",
      },
    },
    onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!editor) return null;

  const btn = (active: boolean) =>
    `inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
      active ? "bg-[#16293A] text-white" : "text-[#727272] hover:bg-[#16293A]/8"
    }`;

  return (
    <div className="overflow-hidden rounded-lg border border-[#16293A]/15">
      <div className="flex flex-wrap items-center gap-1 border-b border-[#16293A]/10 bg-[#16293A]/[0.03] px-2 py-1.5">
        <button type="button" className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()} aria-label="Negrito"><Bold className="h-4 w-4" /></button>
        <button type="button" className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()} aria-label="Itálico"><Italic className="h-4 w-4" /></button>
        <button type="button" className={btn(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} aria-label="Título"><Heading2 className="h-4 w-4" /></button>
        <button type="button" className={btn(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()} aria-label="Lista"><List className="h-4 w-4" /></button>
        <button type="button" className={btn(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()} aria-label="Lista numerada"><ListOrdered className="h-4 w-4" /></button>
        <button type="button" className={btn(editor.isActive("blockquote"))} onClick={() => editor.chain().focus().toggleBlockquote().run()} aria-label="Citação"><Quote className="h-4 w-4" /></button>
        <button
          type="button"
          className={btn(editor.isActive("link"))}
          aria-label="Link"
          onClick={() => {
            const url = window.prompt("Endereço do link", editor.getAttributes("link")["href"] ?? "https://");
            if (url === null) return;
            if (url === "") editor.chain().focus().unsetLink().run();
            else editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          <Link2 className="h-4 w-4" />
        </button>
        <span className="mx-1 h-5 w-px bg-[#16293A]/10" />
        <button type="button" className={btn(false)} onClick={() => editor.chain().focus().undo().run()} aria-label="Desfazer"><Undo2 className="h-4 w-4" /></button>
        <button type="button" className={btn(false)} onClick={() => editor.chain().focus().redo().run()} aria-label="Refazer"><Redo2 className="h-4 w-4" /></button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}