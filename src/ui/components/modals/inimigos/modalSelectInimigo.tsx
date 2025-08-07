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

interface Inimigo {
  id: string;
  nome: string;
  vida: string;
  armadura: string;
  ataque: string;
}

export default function ModalSelectInimigo() {
  const { isOpen, onClose } = useSelectInimigoModal();
  const [inimigos, setInimigos] = useState<Inimigo[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Carrega os inimigos salvos em localForage
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
                  key={inimigo.nome}
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

        {/* Listagem dos inimigos selecionados */}
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
            onClick={() => {
              console.log("Inimigos selecionados:", selectedInimigos);
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