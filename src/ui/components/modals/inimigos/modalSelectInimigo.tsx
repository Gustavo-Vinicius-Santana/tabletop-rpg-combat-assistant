"use client";

import { useEffect, useState } from "react";
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

import localforage from "localforage";
import { useCombateStore } from "@/lib/stores/useCombat";

import { Inimigo } from "@/lib/types/type";

export default function ModalSelectInimigo() {
  const { isOpen, key, onClose } = useSelectInimigoModal();
  const { toggleAtualizarCombate } = useCombateStore();

  const [inimigos, setInimigos] = useState<Inimigo[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    const carregarInimigos = async () => {
      const data = await localforage.getItem<Inimigo[]>("inimigos");
      if (data && Array.isArray(data)) {
        setInimigos(data);
      }
    };

    if (isOpen) {
      carregarInimigos();
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

  const selectedInimigos = inimigos.filter((i) => selected.has(i.nome));

  const handleAddInimigos = async () => {
    if (!key) return;

    const listaAtual = (await localforage.getItem<Inimigo[]>(key)) || [];

    const novosInimigos = selectedInimigos.filter(
      (novo) => !listaAtual.some((existente) => existente.id === novo.id)
    );

    const novaLista = [...listaAtual, ...novosInimigos];

    await localforage.setItem(key, novaLista);

    toggleAtualizarCombate();
    onClose();
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
            {inimigos.length > 0 ? (
              inimigos.map((inimigo) => (
                <SelectableInimigoCard
                  key={inimigo.id}
                  inimigo={inimigo}
                  checked={selected.has(inimigo.nome)}
                  onToggle={() => toggleSelect(inimigo.nome)}
                />
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Nenhum inimigo cadastrado.
              </p>
            )}
          </div>
        </ScrollArea>

        {selected.size > 0 && (
          <div className="mt-4 text-sm text-muted-foreground">
            <h4 className="font-medium text-foreground mb-2">
              Inimigos Selecionados:
            </h4>
            <ul className="list-disc list-inside">
              {selectedInimigos.map((inimigo) => (
                <li key={inimigo.nome}>
                  {inimigo.nome} — Vida: {inimigo.vida}, Armadura:{" "}
                  {inimigo.armadura}, Ataque: {inimigo.ataque}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4">
          <Button
            disabled={selected.size === 0}
            className="w-full"
            onClick={handleAddInimigos}
          >
            Adicionar Inimigos
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
