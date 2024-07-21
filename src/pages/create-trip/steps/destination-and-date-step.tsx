import { MapPin, Calendar, Settings2, ArrowRight } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { ModalCalendar } from "../../../components/modal-calendar";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  eventStartAndEndDates: DateRange | undefined;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  destination: string;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

export function DestinationAndDateStep({
  closeGuestsInput,
  isGuestsInputOpen,
  openGuestsInput,
  destination,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
      : null;

  return (
    <div className="h-auto md:h-16 bg-zinc-900 p-4 rounded-xl flex flex-col md:flex-row md:items-center shadow-shape gap-6 md:gap-4">
      <div className="flex flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <button
        disabled={isGuestsInputOpen}
        onClick={openDatePicker}
        className="flex items-center gap-2 text-left w-[240px]"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400 w-40 flex-1">
          {displayedDate || "Quando?"}
        </span>
      </button>

      {isDatePickerOpen && (
        <ModalCalendar
          eventDates={eventStartAndEndDates}
          setEventDates={setEventStartAndEndDates}
          closeDatePicker={closeDatePicker}
        />
      )}

      <div className="hidden md:block w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button
          onClick={openGuestsInput}
          disabled={
            !destination ||
            !eventStartAndEndDates?.from ||
            !eventStartAndEndDates
          }
        >
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}
