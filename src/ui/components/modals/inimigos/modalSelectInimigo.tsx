"use client";

import { useState } from "react";
import { useSelectInimigoModal } from "@/lib/stores/useModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/shadcn/components/dialog";
import { ScrollArea } from "@/ui/shadcn/components/scroll-area";
import { Button } from "@/ui/shadcn/components/button";

import SelectableInimigoCard from "@/ui/components/cards/selectableInimigoCard";

interface Inimigo {
  nome: string;
  vida: number;
  armadura: number;
  ataque: number;
}

const inimigos: Inimigo[] = [
  { nome: "Goblin", vida: 30, armadura: 5, ataque: 7 },
  { nome: "Orc", vida: 50, armadura: 8, ataque: 12 },
  { nome: "Troll", vida: 80, armadura: 12, ataque: 18 },
];

export default function ModalSelectInimigo() {
  const { isOpen, onClose } = useSelectInimigoModal();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleSelect = (nome: string) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nome)) {
        newSet.delete(nome);
      } else {
        newSet.add(nome);
      }
      return newSet;
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Selecionar Inimigos</DialogTitle>
          <DialogDescription>
            Selecione um ou mais inimigos para adicionar.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[40vh] mt-4">
          <div className="flex flex-col items-center space-y-4">
            {inimigos.map((inimigo) => (
              <SelectableInimigoCard
                key={inimigo.nome}
                inimigo={inimigo}
                checked={selected.has(inimigo.nome)}
                onToggle={() => toggleSelect(inimigo.nome)}
              />
            ))}
          </div>
        </ScrollArea>

        <div className="pt-4">
          <Button
            disabled={selected.size === 0}
            className="w-full"
            onClick={() => {
              console.log("Inimigos selecionados:", Array.from(selected));
              onClose();
            }}
          >
            Adicionar Inimigos
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}