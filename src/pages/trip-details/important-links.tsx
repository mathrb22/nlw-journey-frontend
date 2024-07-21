import { Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { InfoSkeleton } from "../../components/guests-skeleton";
import { toast } from "sonner";
import { CreateLinkModal } from "./create-link-modal";
import { ConfirmDeleteModal } from "../../components/confirm-delete-modal";
import { ImportantLinkCard } from "./important-link-card";
import { useTripDetailsContext } from "../../contexts/TripDetailsContext";

export interface ImportantLink {
  id?: string;
  title: string;
  url: string;
}

export interface LinksResponseBody {
  links: ImportantLink[];
}

export function ImportantLinks() {
  const { tripId } = useParams();

  const {
    importantLinks,
    getImportantLinks,
    isLoadingImportantLinks,
    setIsLoadingImportantLinks,
  } = useTripDetailsContext();

  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);
  const [ìsConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  const [selectedLink, setSelectedLink] = useState<ImportantLink | undefined>();

  const openCreateLinkModal = () => {
    setIsCreateLinkModalOpen(true);
  };

  const closeCreateLinkModal = (created?: boolean) => {
    setIsCreateLinkModalOpen(false);
    setSelectedLink(undefined);

    if (created) {
      getImportantLinks();
    }
  };

  useEffect(() => {
    setIsLoadingImportantLinks(true);
    getImportantLinks();
  }, [tripId]);

  const handleEdit = (link: ImportantLink) => {
    setSelectedLink(link);
    setIsCreateLinkModalOpen(true);
  };

  const handleDelete = (link: ImportantLink) => {
    setSelectedLink(link);
    setIsConfirmDeleteModalOpen(true);
  };

  const onCloseConfirmDeleteModal = () => {
    setSelectedLink(undefined);
    setIsConfirmDeleteModalOpen(false);
  };

  const deleteLink = async () => {
    if (!selectedLink) return;

    const deleteResponse = await api.delete(`/links/${selectedLink.id}`);

    if (deleteResponse.status === 200) {
      toast.success("Link removido com sucesso!");
      setIsConfirmDeleteModalOpen(false);
      setSelectedLink(undefined);
      getImportantLinks();
    } else {
      toast.error("Erro ao remover o link.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        {isLoadingImportantLinks && (
          <div className="flex flex-col gap-6">
            <InfoSkeleton />
          </div>
        )}

        {!isLoadingImportantLinks &&
          importantLinks &&
          importantLinks.length === 0 && (
            <p className="text-zinc-400">
              Nenhum link cadastrado para essa viagem.
            </p>
          )}

        {!isLoadingImportantLinks &&
          importantLinks &&
          importantLinks.map((link) => (
            <ImportantLinkCard
              key={link.id}
              link={link}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
      </div>

      <Button
        variant="secondary"
        size="full"
        onClick={openCreateLinkModal}
        disabled={isLoadingImportantLinks}
      >
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

      {isCreateLinkModalOpen && (
        <CreateLinkModal
          isEditing={!!selectedLink}
          link={selectedLink}
          closeCreateLinkModal={closeCreateLinkModal}
        />
      )}

      {ìsConfirmDeleteModalOpen && (
        <ConfirmDeleteModal
          onClose={onCloseConfirmDeleteModal}
          subtitle="Tem certeza que deseja remover esse link?"
          onConfirm={deleteLink}
        />
      )}
    </div>
  );
}
