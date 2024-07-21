import { Calendar, MapPin, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { ModalCalendar } from "../../components/modal-calendar";
import { setEndOfDay } from "../../utils/setEndOfDay";

interface ChangeDestinationAndDatesModalProps {
  destination: string;
  eventStartAndEndDates: DateRange | undefined;
  closeChangeDestinationAndDatesModal: (updated?: boolean) => void;
}

export function ChangeDestinationAndDatesModal({
  destination,
  eventStartAndEndDates,
  closeChangeDestinationAndDatesModal,
}: ChangeDestinationAndDatesModalProps) {
  const { tripId } = useParams();

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [destinationName, setDestinationName] = useState(destination);

  const [eventDates, setEventDates] = useState<DateRange | undefined>(
    eventStartAndEndDates
  );

  const displayedDate =
    eventDates && eventDates.from && eventDates.to
      ? format(eventDates.from, "d' de 'LLL", {
          locale: ptBR,
        })
          .concat(" até ")
          .concat(
            format(eventDates.to, "d' de 'LLL", {
              locale: ptBR,
            })
          )
      : null;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!eventDates?.from || !eventDates?.to) {
      toast.error("Selecione as datas da viagem");
      return;
    }

    setIsSubmitting(true);

    const adjustedEndDate = setEndOfDay(eventDates.to);

    api
      .put(`/trips/${tripId}`, {
        destination: destinationName,
        starts_at: eventDates?.from,
        ends_at: adjustedEndDate,
      })
      .then(() => {
        setIsSubmitting(false);
        closeChangeDestinationAndDatesModal(true);
      })
      .catch(() => {
        setIsSubmitting(false);
        toast.error("Erro ao atualizar atividade");
      });
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-10">
      <div className="w-full sm:w-[520px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Atualizar local/data</h2>
            <button>
              <X
                className="size-5 text-zinc-400 hover:text-zinc-300 transition-colors duration-200"
                onClick={() => closeChangeDestinationAndDatesModal()}
              />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Atualize o local e as datas da viagem.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <MapPin className="size-5 text-zinc-400" />
            <input
              type="text"
              name="destination"
              value={destinationName}
              placeholder="Para onde você vai?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={(event) => setDestinationName(event.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={openDatePicker}
            className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 w-full"
          >
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-lg text-zinc-400">
              {displayedDate || "Quando?"}
            </span>
          </button>

          {/* <p className="text-sm text-zinc-400 flex gap-2 pb-3 leading-5">
            <CircleAlert className="size-5" />
            Ao alterar as datas da viagem, você perderá as atividades já
            adicionadas.
          </p> */}

          {isDatePickerOpen && (
            <ModalCalendar
              eventDates={eventDates}
              setEventDates={setEventDates}
              closeDatePicker={closeDatePicker}
            />
          )}

          <Button type="submit" size="full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <ClipLoader size={22} color="text-zinc-500" />
                <span className="ml-2">Salvando viagem</span>
              </>
            ) : (
              <span>Atualizar viagem</span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
