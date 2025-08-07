"use client";

import { useEffect, useState } from "react";
import localForage from "localforage";

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
  id: string;
  nome: string;
  tipo: string;
  armadura: string;
  ataque: string;
  nivel: string;
  classe: string;
  raca: string;
  pp: string;
  vida: string;
  dano: string;
  iniciativa: number;
}

export default function ModalSelectPersonagem() {
  const { isOpen, onClose } = useSelectPersonagemModal();
  const [personagens, setPersonagens] = useState<Personagem[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const selectedPersonagens = personagens.filter((p) =>
    selectedIds.includes(p.id)
  );

  // Carrega personagens armazenados
  useEffect(() => {
    const loadPersonagens = async () => {
      const stored = await localForage.getItem<Personagem[]>("personagens");
      if (stored) {
        setPersonagens(stored);
      }
    };
    if (isOpen) loadPersonagens();
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Selecionar Personagens</DialogTitle>
          <DialogDescription>
            Selecione um ou mais personagens armazenados.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[40vh] mt-4">
          <div className="flex flex-col items-center space-y-4">
            {personagens.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhum personagem cadastrado.
              </p>
            ) : (
              personagens.map((p, index) => (
                <SelectablePersonagemCard
                  key={index}
                  personagem={p}
                  checked={selectedIds.includes(p.id)}
                  onToggle={() => handleToggle(p.id)}
                />
              ))
            )}
          </div>
        </ScrollArea>

        {selectedPersonagens.length > 0 && (
          <div className="mt-4 text-sm text-muted-foreground">
            <h4 className="font-medium text-foreground mb-2">
              Personagens Selecionados:
            </h4>
            <ul className="list-disc list-inside">
              {selectedPersonagens.map((p) => (
                <li key={p.id}>
                  {p.nome} — {p.classe} {p.nivel}, Vida: {p.vida}, Iniciativa: {p.iniciativa}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4">
          <Button
            disabled={selectedIds.length === 0}
            className="w-full"
            onClick={() => {
              console.log("Personagens selecionados:", selectedPersonagens);
              onClose();
            }}
          >
            Adicionar Personagem{selectedIds.length > 1 ? "s" : ""}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}