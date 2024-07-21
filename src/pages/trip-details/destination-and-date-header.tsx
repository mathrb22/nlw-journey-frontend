import { MapPin, Calendar, Settings2, ArrowLeft } from "lucide-react";
import { Button } from "../../components/button";
import { Trip } from ".";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ChangeDestinationAndDatesModal } from "./change-destination-and-date-modal";
import { useState } from "react";
import { ptBR } from "date-fns/locale";

interface DestinationAndDateHeaderProps {
  trip?: Trip;
  isLoadingTrip?: boolean;
  onUpdateTrip: () => void;
}

export function DestinationAndDateHeader({
  trip,
  isLoadingTrip,
  onUpdateTrip,
}: DestinationAndDateHeaderProps) {
  const navigate = useNavigate();

  const [
    isChangeDestinationAndDatesModalOpen,
    setIsChangeDestinationAndDatesModalOpen,
  ] = useState(false);

  function openChangeDestinationAndDatesModal() {
    setIsChangeDestinationAndDatesModalOpen(true);
  }

  function closeChangeDestinationAndDatesModal(updated?: boolean) {
    if (updated) {
      onUpdateTrip();
    }
    setIsChangeDestinationAndDatesModalOpen(false);
  }

  const displayedDate =
    trip && trip.starts_at && trip.ends_at
      ? format(parseISO(trip.starts_at), "d' de 'LLL", {
          locale: ptBR,
        })
          .concat(" até ")
          .concat(
            format(parseISO(trip.ends_at), "d' de 'LLL", {
              locale: ptBR,
            })
          )
      : null;

  return (
    <>
      <div className="p-4 h-auto rounded-xl bg-zinc-900 shadow-shape flex flex-col gap-5 justify-between md:flex-row md:h-16 md:items-center md:gap-0">
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => navigate("/")}>
            <ArrowLeft className="size-6 text-zinc-400 cursor-pointer" />
          </Button>
          {isLoadingTrip ? (
            <Skeleton
              baseColor="#292929"
              highlightColor="#444"
              width={200}
              height={22}
            />
          ) : (
            <>
              <MapPin className="size-5 text-zinc-400 ml-1" />
              <span className="text-zinc-100">{trip?.destination}</span>
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <div className="flex items-center gap-2">
            {isLoadingTrip ? (
              <Skeleton
                baseColor="#292929"
                highlightColor="#444"
                width={200}
                height={22}
              />
            ) : (
              <>
                <Calendar className="size-5 text-zinc-400" />
                <span className="text-zinc-100">{displayedDate}</span>
              </>
            )}
          </div>

          <div className="hidden md:block w-px h-6 bg-zinc-800" />

          <Button
            variant="secondary"
            disabled={isLoadingTrip}
            onClick={openChangeDestinationAndDatesModal}
          >
            Alterar local/data
            <Settings2 className="size-5" />
          </Button>
        </div>
      </div>

      {isChangeDestinationAndDatesModalOpen && trip && (
        <ChangeDestinationAndDatesModal
          destination={trip?.destination}
          closeChangeDestinationAndDatesModal={
            closeChangeDestinationAndDatesModal
          }
          eventStartAndEndDates={{
            from: parseISO(trip?.starts_at || ""),
            to: parseISO(trip?.ends_at || ""),
          }}
        />
      )}
    </>
  );
}
