import { useEffect } from "react";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { useParams } from "react-router-dom";
import { Activities } from "./activities";
import { ExternalLink, Github } from "lucide-react";
import { useTripDetailsContext } from "../../contexts/TripDetailsContext";

export interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export function TripDetailsPage() {
  const { tripId } = useParams();

  const { trip, isLoadingTrip, getTripDetails, getActivities } =
    useTripDetailsContext();

  useEffect(() => {
    getTripDetails();
  }, [tripId]);

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8 ">
      <div className="flex items-center justify-between">
        <img src="/logo.svg" alt="plann.er" />
        <a
          className="flex items-center gap-2 text-zinc-400 group hover:text-zinc-500 transition-all duration-300"
          href="https://github.com/mathrb22/nlw-journey-frontend"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="size-5 text-zinc-400 inline-block group-hover:text-zinc-500 transition-all duration-300" />
          GitHub
          <ExternalLink className="size-5 text-zinc-400 inline-block group-hover:text-zinc-500 transition-all duration-300" />
        </a>
      </div>
      <DestinationAndDateHeader
        trip={trip}
        isLoadingTrip={isLoadingTrip}
        onUpdateTrip={() => {
          getTripDetails();
          getActivities();
        }}
      />

      <main
        className="flex flex-col gap-16 px-4 lg:flex-row
      "
      >
        <div className="flex-1">
          <Activities trip={trip} />
        </div>
        <div className="w-full lg:w-80 space-y-6">
          <ImportantLinks />

          <div className="w-full h-px bg-zinc-800" />

          <Guests />
        </div>
      </main>
    </div>
  );
}
