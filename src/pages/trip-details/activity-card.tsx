import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CircleCheck, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface Activity {
  id: string;
  title: string;
  occurs_at: string;
}

export interface ActivityCardProps {
  activity: Activity;
  onEdit: (activity: Activity) => void;
  onDelete: (activity: Activity) => void;
}

export function ActivityCard({
  activity,
  onEdit,
  onDelete,
}: ActivityCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openOptionsMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useRef<HTMLDivElement>(null);
  const optionsIconRef = useRef<SVGSVGElement>(null);

  const handleEdit = () => {
    setIsMenuOpen(false);
    onEdit(activity);
  };

  const handleDelete = () => {
    setIsMenuOpen(false);
    onDelete(activity);
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
    <div className="space-y-2.5">
      <div className="p-4 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3 relative">
        <CircleCheck className="size-5 text-lime-300" />
        <span className="text-zinc-100">{activity.title}</span>
        <span className="text-zinc-400 text-sm ml-auto">
          {format(activity.occurs_at, `H:mm`, {
            locale: ptBR,
          })}
        </span>
        <EllipsisVertical
          ref={optionsIconRef}
          className="text-zinc-400 size-5 shrink-0 cursor-pointer hover:text-zinc-200 transition-colors duration-300"
          onClick={openOptionsMenu}
        />
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-10 right-0 mt-2 w-48 bg-zinc-800 rounded-lg shadow-shape transition-all select-none z-10"
          >
            <button
              className="w-full text-left px-4 py-4 text-sm text-zinc-200 hover:bg-zinc-700 rounded-tl-lg rounded-tr-lg transition-all duration-200 flex items-center gap-3 border-b-[0.5px] border-zinc-700"
              onClick={() => handleEdit()}
            >
              <Pencil className="size-5 shrink-0" />
              Editar atividade
            </button>
            <button
              className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-zinc-700 rounded-bl-lg rounded-br-lg duration-200 flex items-center gap-3"
              onClick={() => handleDelete()}
            >
              <Trash2 className="size-5 shrink-0 text-red-400" />
              Remover atividade
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
