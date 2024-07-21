import React, { createContext, useContext, useMemo, useState } from "react";
import { Trip } from "../pages/trip-details";
import {
  ImportantLink,
  LinksResponseBody,
} from "../pages/trip-details/important-links";
import { TripDay } from "../pages/trip-details/activities";
import { Participant } from "../pages/trip-details/guests";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { api } from "../lib/axios";
import { toast } from "sonner";

interface TripDetailsContextProps {
  trip?: Trip;
  getTripDetails: () => void;
  setTrip: (trip: Trip) => void;
  isLoadingTrip?: boolean;
  setIsLoadingTrip: (loading: boolean) => void;

  activities?: TripDay[];
  getActivities: () => void;
  setActivities: (activities: TripDay[]) => void;
  isLoadingActivities?: boolean;
  setIsLoadingActivities: (loading: boolean) => void;

  importantLinks?: ImportantLink[];
  getImportantLinks: () => void;
  setImportantLinks: (links: ImportantLink[]) => void;
  isLoadingImportantLinks?: boolean;
  setIsLoadingImportantLinks: (loading: boolean) => void;

  participants?: Participant[];
  getParticipants: () => void;
  setParticipants: (participants: Participant[]) => void;
  isLoadingParticipants?: boolean;
  setIsLoadingParticipants: (loading: boolean) => void;
}

const TripDetailsContext = createContext<TripDetailsContextProps | undefined>(
  undefined
);

interface TripDetailsProviderProps {
  children: React.ReactNode;
}

export const TripDetailsProvider = ({ children }: TripDetailsProviderProps) => {
  const [trip, setTrip] = useState<Trip | undefined>();
  const [isLoadingTrip, setIsLoadingTrip] = useState(false);
  const [activities, setActivities] = useState<TripDay[]>([]);
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);
  const [importantLinks, setImportantLinks] = useState<ImportantLink[]>([]);
  const [isLoadingImportantLinks, setIsLoadingImportantLinks] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoadingParticipants, setIsLoadingParticipants] = useState(false);

  const navigate = useNavigate();

  const { tripId } = useParams();

  const contextValue = useMemo(() => {
    const getTripDetails = async () => {
      setIsLoadingTrip(true);
      api
        .get(`trips/${tripId}`)
        .then((response) => {
          setTimeout(() => {
            setTrip(response.data.trip);
            setIsLoadingTrip(false);
            return response.data.trip;
          }, 600);
        })
        .catch((err) => {
          if (err instanceof AxiosError && err.response?.status === 400) {
            navigate("/404");
            toast.error("Plano de viagem não encontrado.");
            setIsLoadingTrip(false);
          }
        });
    };

    const getActivities = async () => {
      if (!tripId) return;

      api
        .get(`trips/${tripId}/activities`)
        .then((response) => {
          setTimeout(() => {
            setActivities(response.data.activities);
            setIsLoadingActivities(false);
          }, 600);
        })
        .catch((err) => {
          console.error(err);
          setIsLoadingActivities(false);
        });
    };

    const getImportantLinks = async () => {
      if (!tripId) return;

      api.get<LinksResponseBody>(`trips/${tripId}/links`).then((response) => {
        setTimeout(() => {
          setImportantLinks(response.data.links);
          setIsLoadingImportantLinks(false);
        }, 600);
      });
    };

    const getParticipants = async () => {
      if (!tripId) return;

      api
        .get(`trips/${tripId}/participants`)
        .then((response) => {
          setTimeout(() => {
            setParticipants(response.data.participants);
            setIsLoadingParticipants(false);
          }, 600);
        })
        .catch((err) => {
          console.error(err);
          setIsLoadingParticipants(false);
        });
    };

    return {
      trip,
      setTrip,
      getTripDetails,
      isLoadingTrip,
      setIsLoadingTrip,
      activities,
      getActivities,
      setActivities,
      isLoadingActivities,
      setIsLoadingActivities,
      importantLinks,
      getImportantLinks,
      setImportantLinks,
      isLoadingImportantLinks,
      setIsLoadingImportantLinks,
      participants,
      getParticipants,
      setParticipants,
      isLoadingParticipants,
      setIsLoadingParticipants,
    };
  }, [
    trip,
    isLoadingTrip,
    activities,
    isLoadingActivities,
    importantLinks,
    isLoadingImportantLinks,
    participants,
    isLoadingParticipants,
    tripId,
    navigate,
  ]);

  return (
    <TripDetailsContext.Provider value={contextValue}>
      {children}
    </TripDetailsContext.Provider>
  );
};

export const useTripDetailsContext = () => {
  const context = useContext(TripDetailsContext);

  if (!context) {
    throw new Error(
      "useTripDetailsContext must be used within a TripDetailsProvider"
    );
  }

  return context;
};
