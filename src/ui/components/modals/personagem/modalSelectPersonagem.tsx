"use client";

import { useState } from "react";
import { useSelectPersonagemModal } from "@/lib/stores/useModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/shadcn/components/dialog";
import { ScrollArea } from "@/ui/shadcn/components/scroll-area";
import { Button } from "@/ui/shadcn/components/button";

import SelectablePersonagemCard from "@/ui/components/cards/selectablePersonagemCard";

interface Personagem {
  nome: string;
  classe: string;
  raca: string;
  nivel: number;
  vida: number;
  armadura: number;
  pp: number;
}

const personagens: Personagem[] = [
  {
    nome: "Arthas",
    classe: "Paladino",
    raca: "Humano",
    nivel: 10,
    vida: 120,
    armadura: 10,
    pp: 10,
  },
  {
    nome: "Thrall",
    classe: "Xamã",
    raca: "Orc",
    nivel: 12,
    vida: 140,
    armadura: 10,
    pp: 10,
  },
];

export default function ModalSelectPersonagem() {
  const { isOpen, onClose } = useSelectPersonagemModal();
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (nome: string) => {
    setSelected((prev) =>
      prev.includes(nome) ? prev.filter((n) => n !== nome) : [...prev, nome]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Selecionar Personagens</DialogTitle>
          <DialogDescription>
            Selecione um ou mais personagens.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[40vh] mt-4">
          <div className="flex flex-col items-center space-y-4">
            {personagens.map((p) => (
              <SelectablePersonagemCard
                key={p.nome}
                personagem={p}
                checked={selected.includes(p.nome)}
                onToggle={() => handleToggle(p.nome)}
              />
            ))}
          </div>
        </ScrollArea>

        <div className="pt-4">
          <Button disabled={selected.length === 0} className="w-full">
            Adicionar Personagem{selected.length > 1 ? "s" : ""}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}