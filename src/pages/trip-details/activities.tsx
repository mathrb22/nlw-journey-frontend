import { CircleCheck } from "lucide-react";
import { api } from "../../lib/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ActivitySkeleton } from "./activity-skeleton";

interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

export function Activities() {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);

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
        <div className="flex flex-col gap-10">
          <>
            <ActivitySkeleton />
            <ActivitySkeleton />
            <ActivitySkeleton />
            <ActivitySkeleton />
            <ActivitySkeleton />
          </>
        </div>
      )}

      {activities &&
        !isLoadingActivities &&
        activities.map((activity) => {
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
  );
}
