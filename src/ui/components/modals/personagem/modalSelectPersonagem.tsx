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
import { useCombateStore } from "@/lib/stores/useCombat";
import { useAventuraStore } from "@/lib/stores/useAventura";
import { Personagem } from "@/lib/types/type";

export default function ModalSelectPersonagem() {
  const { isOpen, key, onClose } = useSelectPersonagemModal();
  const { toggleAtualizarCombate } = useCombateStore();
  const { toggleAtualizarAventura } = useAventuraStore();

  const [personagens, setPersonagens] = useState<Personagem[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    const carregarPersonagens = async () => {
      const data = await localForage.getItem<Personagem[]>("personagens");
      if (data && Array.isArray(data)) {
        setPersonagens(data);
      }
    };

    if (isOpen) {
      carregarPersonagens();
    }
  }, [isOpen]);

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

  const selectedPersonagens = personagens.filter((p) =>
    selected.has(p.nome)
  );

  const handleAddPersonagens = async () => {
    if (!key) return;

    const listaAtual = (await localForage.getItem<Personagem[]>(key)) || [];

    const novos = selectedPersonagens.filter(
      (novo) => !listaAtual.some((existente) => existente.id === novo.id)
    );

    const novaLista = [...listaAtual, ...novos];

    await localForage.setItem(key, novaLista);

    toggleAtualizarCombate();
    toggleAtualizarAventura();
    onClose();
  };

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
            {personagens.length > 0 ? (
              personagens.map((personagem) => (
                <SelectablePersonagemCard
                  key={personagem.nome}
                  personagem={personagem}
                  checked={selected.has(personagem.nome)}
                  onToggle={() => toggleSelect(personagem.nome)}
                />
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Nenhum personagem cadastrado.
              </p>
            )}
          </div>
        </ScrollArea>

        {selected.size > 0 && (
          <div className="mt-4 text-sm text-muted-foreground">
            <h4 className="font-medium text-foreground mb-2">
              Personagens Selecionados:
            </h4>
            <ul className="list-disc list-inside">
              {selectedPersonagens.map((p) => (
                <li key={p.nome}>
                  {p.nome} — {p.classe} {p.nivel}, Vida: {p.vida}, Iniciativa:{" "}
                  {p.iniciativa}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4">
          <Button
            disabled={selected.size === 0}
            className="w-full"
            onClick={handleAddPersonagens}
          >
            Adicionar Personagem{selected.size > 1 ? "s" : ""}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}