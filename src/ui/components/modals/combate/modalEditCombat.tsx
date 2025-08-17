"use client";

import { useEffect, useState } from "react";
import localforage from "localforage";
import { Button } from "@/ui/shadcn/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/shadcn/components/dialog";
import { Input } from "@/ui/shadcn/components/input";
import { Label } from "@/ui/shadcn/components/label";
import { useListaStore } from "@/lib/stores/useLIstas";
import { useEditCombatModal } from "@/lib/stores/useModal";
import { useCombateStore } from "@/lib/stores/useCombat";
import { Minus, Plus } from "lucide-react";

type Combate = {
  turno: number;
  rodada: number;
  tempo: number; // agora em segundos
};

// converte segundos para MM:SS
const formatTime = (seconds: number) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
};

// converte string MM:SS para segundos
const parseTime = (str: string): number => {
  const [m, s] = str.split(":").map(Number);
  return (m || 0) * 60 + (s || 0);
};

export default function ModalEditCombat() {
  const { isOpen, onClose } = useEditCombatModal();
  const { toggleAtualizarLista } = useListaStore();
  const { toggleAtualizarCombate } = useCombateStore();

  const [form, setForm] = useState<Combate>({
    turno: 1,
    rodada: 1,
    tempo: 0, // segundos
  });

  useEffect(() => {
    const carregar = async () => {
      const turno = (await localforage.getItem<number>("turnoAtual")) ?? 1;
      const rodada = (await localforage.getItem<number>("rodadaAtual")) ?? 1;
      const tempoSalvo =
        (await localforage.getItem<number>("tempoCombate")) ?? 0;

      setForm({ turno, rodada, tempo: tempoSalvo });
    };

    if (isOpen) carregar();
  }, [isOpen]);

  const atualizar = (campo: keyof Combate, valor: string | number) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();

    await localforage.setItem("turnoAtual", form.turno);
    await localforage.setItem("rodadaAtual", form.rodada);
    await localforage.setItem("tempoCombate", form.tempo); // mantém em segundos

    toggleAtualizarLista();
    toggleAtualizarCombate();
    onClose();
  };

  const resetar = async () => {
    const valoresResetados: Combate = {
      turno: 0,
      rodada: 1,
      tempo: 0,
    };

    await localforage.setItem("turnoAtual", valoresResetados.turno);
    await localforage.setItem("rodadaAtual", valoresResetados.rodada);
    await localforage.setItem("tempoCombate", valoresResetados.tempo);

    setForm(valoresResetados);

    toggleAtualizarLista();
    toggleAtualizarCombate();
    onClose();
  };

  const alterarTempo = (delta: number) => {
    setForm((prev) => ({
      ...prev,
      tempo: Math.max(0, prev.tempo + delta),
    }));
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Combate</DialogTitle>
          <DialogDescription>
            Atualize as informações do combate.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={salvar} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="turno">Turno Atual</Label>
              <Input
                id="turno"
                type="number"
                value={form.turno}
                onChange={(e) => atualizar("turno", Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="rodada">Rodada Atual</Label>
              <Input
                id="rodada"
                type="number"
                value={form.rodada}
                onChange={(e) => atualizar("rodada", Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="tempo">Tempo de Combate</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => alterarTempo(-6)}
              >
                <Minus size={16} />
              </Button>

              <Input
                id="tempo"
                type="text"
                className="w-full"
                value={formatTime(form.tempo)}
                onChange={(e) =>
                  atualizar("tempo", parseTime(e.target.value))
                }
              />

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => alterarTempo(6)}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <Button type="submit" className="w-full">
              Salvar
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="w-full"
              onClick={resetar}
            >
              Resetar Combate
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}