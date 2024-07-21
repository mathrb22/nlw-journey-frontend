import { X } from "lucide-react";
import { Button } from "./button";

interface ConfirmDeleteModalProps {
  title?: string;
  subtitle?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmDeleteModal({
  title = "Confirmar exclusão",
  subtitle = "Tem certeza que deseja excluir esse item?",
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-full sm:w-[520px] min-h-40 rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">{title}</h2>
            <button>
              <X
                className="size-5 text-zinc-400 hover:text-zinc-300 transition-colors duration-200"
                onClick={onClose}
              />
            </button>
          </div>

          <p className="text-sm text-zinc-400">{subtitle}</p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button
            size="default"
            variant="secondary"
            className="max-w-28"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button size="default" variant="danger" onClick={onConfirm}>
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
