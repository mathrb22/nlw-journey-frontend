import { CircleCheck, Plus } from "lucide-react";
import { api } from "../../lib/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ActivitySkeleton } from "./activity-skeleton";
import { Button } from "../../components/button";
import { CreateActivityModal } from "./create-activity-modal";
import { Trip } from ".";

export interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

export interface ActivitiesProps {
  trip?: Trip;
}

export function Activities({ trip }: ActivitiesProps) {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);

  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  const openCreateActivityModal = () => {
    setIsCreateActivityModalOpen(true);
  };

  const closeCreateActivityModal = (created?: boolean) => {
    setIsCreateActivityModalOpen(false);

    if (created) {
      getActivities();
    }
  };

  useEffect(() => {
    getActivities();
  }, [tripId]);

  const getActivities = async () => {
    if (!tripId) return;

    setIsLoadingActivities(true);
    api
      .get(`trips/${tripId}/activities`)
      .then((response) => {
        setTimeout(() => {
          setActivities(response.data.activities);
          setIsLoadingActivities(false);
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
        setIsLoadingActivities(false);
      });
  };

  return (
    <div className="space-y-8">
      {isLoadingActivities && (
        <div className="flex flex-col gap-8">
          <>
            <ActivitySkeleton />
            <ActivitySkeleton />
            <ActivitySkeleton />
            <ActivitySkeleton />
            <ActivitySkeleton />
          </>
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
                        <div key={activity.id} className="space-y-2.5">
                          <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                            <CircleCheck className="size-5 text-lime-300" />
                            <span className="text-zinc-100">
                              {activity.title}
                            </span>
                            <span className="text-zinc-400 text-sm ml-auto">
                              {format(activity.occurs_at, `hh:mm`)}
                            </span>
                          </div>
                        </div>
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
          closeCreateActivityModal={closeCreateActivityModal}
          minDate={format(
            parseISO(trip?.starts_at || ""),
            "yyyy-MM-dd'T'HH:mm"
          )}
          maxDate={format(parseISO(trip?.ends_at || ""), "yyyy-MM-dd'T'HH:mm")}
        />
      )}
    </div>
  );
}
