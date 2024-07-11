import {
  Link2,
  Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

interface CreateLinkModalProps {
  closeCreateLinkModal: (created?: boolean) => void;
}

export function CreateLinkModal({
  closeCreateLinkModal,
}: CreateLinkModalProps) {
  const { tripId } = useParams();
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString();
    const url = data.get("url")?.toString();

    setIsCreatingLink(true);

    api
      .post(`/trips/${tripId}/links`, {
        title,
        url,
      })
      .then(() => {
        setTimeout(() => {
          toast.success("Link adicionado com sucesso!");
          setIsCreatingLink(false);
          closeCreateLinkModal(true);
        }, 1000);
      })
      .catch(() => {
        toast.error("Erro ao adicionar o link.");
        setIsCreatingLink(false);
      });
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Cadastrar link</h2>
            <button>
              <X
                className="size-5 text-zinc-400"
                onClick={() => closeCreateLinkModal()}
              />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar os links importantes.
          </p>
        </div>

        <form onSubmit={createLink} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              name="title"
              value={title}
              placeholder="Título do link"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 relative">
            <Link2 className="text-zinc-400 size-5" />
            <input
              type="text"
              name="url"
              value={url}
              placeholder="URL do link"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <Button size="full" disabled={isCreatingLink}>
            {isCreatingLink ? (
              <>
                <ClipLoader size={22} color="text-zinc-500" />
                <span className="ml-2">Salvando link</span>
              </>
            ) : (
              <span>Salvar link</span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}