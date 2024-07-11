import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { InfoSkeleton } from "./guests-skeleton";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoadingParticipants, setIsLoadingParticipants] = useState(false);

  useEffect(() => {
    getParticipants();
  }, [tripId]);

  const getParticipants = async () => {
    if (!tripId) return;
    setIsLoadingParticipants(true);

    api
      .get(`trips/${tripId}/participants`)
      .then((response) => {
        setTimeout(() => {
          setParticipants(response.data.participants);
          setIsLoadingParticipants(false);
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
        setIsLoadingParticipants(false);
      });
  };

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        {isLoadingParticipants && (
          <div className="flex flex-col gap-6">
            <InfoSkeleton />
            <InfoSkeleton />
            <InfoSkeleton />
          </div>
        )}

        {!isLoadingParticipants && participants.length === 0 && (
          <p className="text-zinc-400">Nenhum convidado para essa viagem.</p>
        )}

        {!isLoadingParticipants &&
          participants &&
          participants.map((participant, index) => (
            <div
              key={participant.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {participant.name ?? `Convidado ${index}`}
                </span>
                <span className="block text-sm text-zinc-400 truncate">
                  {participant.email}
                </span>
              </div>

              {participant.is_confirmed ? (
                <CheckCircle2 className="text-green-400 size-5 shrink-0" />
              ) : (
                <CircleDashed className="text-zinc-400 size-5 shrink-0" />
              )}
            </div>
          ))}
      </div>

      <Button variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  );
}
