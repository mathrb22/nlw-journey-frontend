import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";
import { DateRange, DayPicker } from "react-day-picker";

interface ModalCalendarProps {
  eventDates: DateRange | undefined;
  setEventDates: (dates: DateRange | undefined) => void;
  closeDatePicker: () => void;
}

export function ModalCalendar({
  eventDates,
  setEventDates,
  closeDatePicker,
}: ModalCalendarProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Selecione a data</h2>
            <button>
              <X
                className="size-5 text-zinc-400 hover:text-zinc-300 transition-colors duration-200"
                onClick={closeDatePicker}
              />
            </button>
          </div>
        </div>

        <DayPicker
          locale={ptBR}
          lang="pt-BR"
          mode="range"
          disabled={{
            before: new Date(new Date().setDate(new Date().getDate() + 1)),
          }}
          selected={eventDates}
          onSelect={setEventDates}
        />
      </div>
    </div>
  );
}
