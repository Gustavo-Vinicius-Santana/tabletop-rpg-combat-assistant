"use client";

import { useListPersonagemModal } from "@/lib/stores/useModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/shadcn/components/dialog";
import { ScrollArea } from "@/ui/shadcn/components/scroll-area";
import CardPersonagem from "@/ui/components/cards/cardPersonagem";

const personagens = [
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
  {
    nome: "Garrosh",
    classe: "Xamã",
    raca: "Orc",
    nivel: 12,
    vida: 140,
    armadura: 10,
    pp: 10,
  },
];

export default function ModalListPersonagem() {
  const { isOpen, onClose } = useListPersonagemModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Lista de Personagens</DialogTitle>
          <DialogDescription>
            Aqui estão os personagens cadastrados.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] mt-4">
          <div className="flex flex-col items-center space-y-4">
            {personagens.map((p) => (
              <CardPersonagem
                key={p.nome}
                nome={p.nome}
                classe={p.classe}
                raca={p.raca}
                nivel={p.nivel}
                vida={p.vida}
                armadura={p.armadura}
                pp={p.pp}
              />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}