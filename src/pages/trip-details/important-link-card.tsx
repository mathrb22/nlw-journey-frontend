import { useEffect, useRef, useState } from "react";
import { ImportantLink } from "./important-links";
import { EllipsisVertical, Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ImportantLinkCardProps {
  link: ImportantLink;
  onEdit: (link: ImportantLink) => void;
  onDelete: (link: ImportantLink) => void;
}

export function ImportantLinkCard({
  link,
  onEdit,
  onDelete,
}: ImportantLinkCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openOptionsMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useRef<HTMLDivElement>(null);
  const optionsIconRef = useRef<SVGSVGElement>(null);

  const copyLinkToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copiado!");
    });
  };

  const handleEdit = () => {
    setIsMenuOpen(false);
    onEdit(link);
  };

  const handleDelete = () => {
    setIsMenuOpen(false);
    onDelete(link);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        optionsIconRef.current &&
        !optionsIconRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="flex items-center justify-between gap-4 relative">
      <div className="space-y-1.5 ">
        <span className="block font-medium text-zinc-100">{link.title}</span>
        <a
          href={link.url}
          target="_blank"
          className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
        >
          {link.url}
        </a>
      </div>

      <div className="flex items-center gap-4">
        <Link2
          className="text-zinc-400 size-6 shrink-0 cursor-pointer hover:text-zinc-200 transition-colors duration-300"
          onClick={() => copyLinkToClipboard(link.url)}
        />

        <EllipsisVertical
          ref={optionsIconRef}
          className="text-zinc-400 size-6 shrink-0 cursor-pointer hover:text-zinc-200 transition-colors duration-300"
          onClick={openOptionsMenu}
        />
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-10 right-0 mt-2 w-48 bg-zinc-800 rounded-lg shadow-shape transition-all select-none z-10"
          >
            <button
              className="w-full text-left px-4 py-4 bg-zinc-800 text-sm text-zinc-200 hover:bg-zinc-700 rounded-tl-lg rounded-tr-lg transition-all duration-200 flex items-center gap-3 border-b-[0.5px] border-zinc-700"
              onClick={() => handleEdit()}
            >
              <Pencil className="size-5 shrink-0" />
              Editar link
            </button>
            <button
              className="w-full text-left px-4 py-3 bg-zinc-800 text-sm text-red-400 hover:bg-zinc-700 rounded-bl-lg rounded-br-lg duration-200 flex items-center gap-3"
              onClick={() => handleDelete()}
            >
              <Trash2 className="size-5 shrink-0 text-red-400" />
              Remover link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
