import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { InfoSkeleton } from "../../components/guests-skeleton";
import { useTripDetailsContext } from "../../contexts/TripDetailsContext";

export interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function Guests() {
  const { tripId } = useParams();

  const {
    participants,
    getParticipants,
    isLoadingParticipants,
    setIsLoadingParticipants,
  } = useTripDetailsContext();

  useEffect(() => {
    setIsLoadingParticipants(true);
    getParticipants();
  }, [tripId]);

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

        {!isLoadingParticipants &&
          participants &&
          participants.length === 0 && (
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
