"use client";

import { useEffect, useState } from "react";
import localforage from "localforage";

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

import type { Inimigo } from "@/lib/types/type";  // Importa o tipo

export default function ModalListInimigo() {
  const { isOpen, onClose } = useListInimigoModal();
  const [inimigos, setInimigos] = useState<Inimigo[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    const carregarInimigos = async () => {
      const dados = await localforage.getItem<Inimigo[]>("inimigos");
      setInimigos(dados ?? []);
    };

    carregarInimigos();
  }, [isOpen]);

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
                iniciativa={inimigo.iniciativa}
              />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}