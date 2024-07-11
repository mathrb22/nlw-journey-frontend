import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useRef, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
  minDate: string;
  maxDate: string;
}

export function CreateActivityModal({
  closeCreateActivityModal,
  minDate,
  maxDate,
}: CreateActivityModalProps) {
  const { tripId } = useParams();

  const [date, setDate] = useState("");
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleReadOnlyClick = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.showPicker();
    }
  };

  const formattedDate = date
    ? format(new Date(date), "Pp", { locale: ptBR })
    : "";

  const [isCreatingActivity, setIsCreatingActivity] = useState(false);

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString();
    const occurs_at = data.get("occurs_at")?.toString();

    setIsCreatingActivity(true);

    api
      .post(`/trips/${tripId}/activities`, {
        title,
        occurs_at,
      })
      .then(() => {
        setTimeout(() => {
          toast.success("Atividade adicionada com sucesso!");
          setIsCreatingActivity(false);
          window.document.location.reload();
        }, 1000);
      })
      .catch(() => {
        toast.error("Erro ao adicionar atividade.");
        setIsCreatingActivity(false);
      });
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Cadastrar atividade</h2>
            <button>
              <X
                className="size-5 text-zinc-400"
                onClick={closeCreateActivityModal}
              />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              name="title"
              placeholder="Qual a atividade?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 relative">
            <Calendar className="text-zinc-400 size-5" />
            <>
              <input
                type="text"
                value={formattedDate}
                placeholder="Data e horário da atividade"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                readOnly
                onClick={handleReadOnlyClick}
              />
              <input
                type="datetime-local"
                name="occurs_at"
                min={minDate}
                max={maxDate}
                value={date}
                onChange={handleDateChange}
                className="opacity-0"
                ref={hiddenInputRef}
              />
            </>
          </div>

          <Button size="full" disabled={isCreatingActivity}>
            {isCreatingActivity ? (
              <>
                <ClipLoader size={22} color="text-zinc-500" />
                <span className="ml-2">Cadastrando atividade</span>
              </>
            ) : (
              <span>Cadastrar atividade</span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
