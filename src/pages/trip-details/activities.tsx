import { Plus } from "lucide-react";
import { api } from "../../lib/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ActivitySkeleton } from "../../components/activity-skeleton";
import { Button } from "../../components/button";
import { CreateActivityModal } from "./create-activity-modal";
import { Trip } from ".";
import { Activity, ActivityCard } from "./activity-card";
import { ConfirmDeleteModal } from "../../components/confirm-delete-modal";
import { toast } from "sonner";
import { useTripDetailsContext } from "../../contexts/TripDetailsContext";

export interface TripDay {
  date: string;
  activities: Activity[];
}

export interface ActivitiesProps {
  trip?: Trip;
}

export function Activities({ trip }: ActivitiesProps) {
  const { tripId } = useParams();
  const {
    activities,
    getActivities,
    isLoadingActivities,
    setIsLoadingActivities,
  } = useTripDetailsContext();

  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >();

  const [ìsConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  const openCreateActivityModal = () => {
    setIsCreateActivityModalOpen(true);
  };

  const closeCreateActivityModal = (created?: boolean) => {
    setIsCreateActivityModalOpen(false);
    setSelectedActivity(undefined);

    if (created) {
      getActivities();
    }
  };

  const handleEdit = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsCreateActivityModalOpen(true);
  };

  const handleDelete = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsConfirmDeleteModalOpen(true);
  };

  const onCloseConfirmDeleteModal = () => {
    setSelectedActivity(undefined);
    setIsConfirmDeleteModalOpen(false);
  };

  useEffect(() => {
    setIsLoadingActivities(true);
    getActivities();
  }, [tripId]);

  const deleteActivity = async () => {
    if (!selectedActivity) return;

    const deleteResponse = await api.delete(
      `/activities/${selectedActivity.id}`
    );

    if (deleteResponse.status === 200) {
      toast.success("Atividade removida com sucesso!");
      setIsConfirmDeleteModalOpen(false);
      setSelectedActivity(undefined);
      getActivities();
    } else {
      toast.error("Erro ao remover a atividade.");
    }
  };

  return (
    <div className="space-y-8">
      {isLoadingActivities && (
        <div className="flex-1 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <Button
              onClick={openCreateActivityModal}
              disabled={isLoadingActivities}
              className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
            >
              <Plus className="size-5" />
              Cadastrar atividade
            </Button>
          </div>
          <div className="flex flex-col gap-8">
            <>
              <ActivitySkeleton />
              <ActivitySkeleton />
              <ActivitySkeleton />
              <ActivitySkeleton />
              <ActivitySkeleton />
            </>
          </div>
        </div>
      )}

      {activities && !isLoadingActivities && (
        <div className="flex-1 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <Button
              onClick={openCreateActivityModal}
              disabled={isLoadingActivities}
              className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
            >
              <Plus className="size-5" />
              Cadastrar atividade
            </Button>
          </div>
          {activities.map((activity) => {
            return (
              <div key={activity.date} className="space-y-2.5">
                <div className="flex gap-2 items-baseline">
                  <span className="text-xl text-zinc-300 font-semibold">
                    Dia {format(activity.date, "d")}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {format(activity.date, "EEEE", { locale: ptBR })}
                  </span>
                </div>
                {activity.activities.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {activity.activities.map((activity) => {
                      return (
                        <ActivityCard
                          key={activity.id}
                          activity={activity}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-zinc-500 text-sm">
                    Nenhuma atividade cadastrada nessa data.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          isEditing={!!selectedActivity}
          activity={selectedActivity}
          closeCreateActivityModal={closeCreateActivityModal}
          minDate={format(
            parseISO(trip?.starts_at || ""),
            "yyyy-MM-dd'T'HH:mm",
            {
              locale: ptBR,
            }
          )}
          maxDate={format(parseISO(trip?.ends_at || ""), "yyyy-MM-dd'T'HH:mm", {
            locale: ptBR,
          })}
        />
      )}

      {ìsConfirmDeleteModalOpen && (
        <ConfirmDeleteModal
          onClose={onCloseConfirmDeleteModal}
          subtitle="Tem certeza que deseja remover essa atividade?"
          onConfirm={deleteActivity}
        />
      )}
    </div>
  );
}
