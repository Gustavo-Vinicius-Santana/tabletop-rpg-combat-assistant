"use client";

import { useListInimigoModal } from "@/lib/stores/useModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/shadcn/components/dialog";
import { ScrollArea } from "@/ui/shadcn/components/scroll-area";
import CardInimigo from "@/ui/components/cards/cardInimigo";

const inimigos = [
  {
    nome: "Goblin",
    vida: 30,
    armadura: 5,
    ataque: 7,
  },
  {
    nome: "Orc Guerreiro",
    vida: 80,
    armadura: 12,
    ataque: 15,
  },
  {
    nome: "Dragão",
    vida: 300,
    armadura: 25,
    ataque: 40,
  },
  {
    nome: "Guerreiro",
    vida: 100,
    armadura: 15,
    ataque: 20,
  },
];

export default function ModalListInimigo() {
  const { isOpen, onClose } = useListInimigoModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Lista de Inimigos</DialogTitle>
          <DialogDescription>
            Aqui estão os inimigos cadastrados.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] mt-4">
          <div className="flex flex-col items-center space-y-4">
            {inimigos.map((inimigo) => (
              <CardInimigo
                key={inimigo.nome}
                nome={inimigo.nome}
                vida={inimigo.vida}
                armadura={inimigo.armadura}
                ataque={inimigo.ataque}
              />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}