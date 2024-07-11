import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { ImportantLinks } from "./important-links";
import { CreateActivityModal } from "./create-activity-modal";
import { Guests } from "./guests";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";
import { AxiosError } from "axios";

export interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  const navigate = useNavigate();

  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();

  useEffect(() => {
    getTripDetails();
  }, [tripId]);

  const getTripDetails = async () => {
    api
      .get(`trips/${tripId}`)
      .then((response) => {
        setTrip(response.data.trip);
      })
      .catch((err) => {
        if (err instanceof AxiosError && err.response?.status === 400) {
          navigate("/404");
          toast.error("Plano de viagem não encontrado.");
        }
      });
  };

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader trip={trip} />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <button
              onClick={openCreateActivityModal}
              className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
            >
              <Plus className="size-5" />
              Cadastrar atividade
            </button>
          </div>

          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks />

          <div className="w-full h-px bg-zinc-800" />

          <Guests />
        </div>
      </main>

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
