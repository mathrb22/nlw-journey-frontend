import { CircleCheck } from "lucide-react";

export function Activities() {
  return (
    <div className="space-y-8">
      <div className="space-y-2.5">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl text-zinc-300 font-semibold">Dia 18</span>
          <span className="text-xs text-zinc-500">Domingo</span>
        </div>
        <div className="space-y-2.5">
          <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
            <CircleCheck className="size-5 text-lime-300" />
            <span className="text-zinc-100">Academia em grupo</span>
            <span className="text-zinc-400 text-sm ml-auto">08:00h</span>
          </div>
        </div>
        <div className="space-y-2.5">
          <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
            <CircleCheck className="size-5 text-lime-300" />
            <span className="text-zinc-100">Visitar o centro histórico</span>
            <span className="text-zinc-400 text-sm ml-auto">09:00h</span>
          </div>
        </div>
      </div>
      <div className="space-y-2.5">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl text-zinc-300 font-semibold">Dia 19</span>
          <span className="text-xs text-zinc-500">Segunda-feira</span>
        </div>

        <p className="text-zinc-500 text-sm">
          Nenhuma atividade cadastrada nessa data.
        </p>
      </div>
      <div className="space-y-2.5">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl text-zinc-300 font-semibold">Dia 20</span>
          <span className="text-xs text-zinc-500">Terça-feira</span>
        </div>

        <p className="text-zinc-500 text-sm">
          Nenhuma atividade cadastrada nessa data.
        </p>
      </div>
      <div className="space-y-2.5">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl text-zinc-300 font-semibold">Dia 21</span>
          <span className="text-xs text-zinc-500">Quarta-feira</span>
        </div>

        <p className="text-zinc-500 text-sm">
          Nenhuma atividade cadastrada nessa data.
        </p>
      </div>
      <div className="space-y-2.5">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl text-zinc-300 font-semibold">Dia 22</span>
          <span className="text-xs text-zinc-500">Quinta-feira</span>
        </div>

        <p className="text-zinc-500 text-sm">
          Nenhuma atividade cadastrada nessa data.
        </p>
      </div>
    </div>
  );
}
