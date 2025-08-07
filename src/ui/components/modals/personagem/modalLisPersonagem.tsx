"use client";

import { useEffect, useState } from "react";
import localforage from "localforage";

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
import type { Personagem } from "@/lib/types/type";

export default function ModalListPersonagem() {
  const { isOpen, onClose } = useListPersonagemModal();
  const [personagens, setPersonagens] = useState<Personagem[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    const carregarPersonagens = async () => {
      const dados = await localforage.getItem<Personagem[]>("personagens");
      setPersonagens(dados ?? []);
    };

    carregarPersonagens();
  }, [isOpen]);

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
                iniciativa={p.iniciativa}
              />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}