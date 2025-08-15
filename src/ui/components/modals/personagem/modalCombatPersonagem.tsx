"use client";

import { useState, useEffect } from "react";
import type { Personagem } from "@/lib/types/type";
import { useCombatPersonagemModal } from "@/lib/stores/useModal";
import { Button } from "@/ui/shadcn/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/shadcn/components/dialog";
import { Input } from "@/ui/shadcn/components/input";
import { Label } from "@/ui/shadcn/components/label";
import { ScrollArea } from "@/ui/shadcn/components/scroll-area";
import { Textarea } from "@/ui/shadcn/components/textarea";
import localforage from "localforage";
import { useCombateStore } from "@/lib/stores/useCombat";

export default function ModalCombatPersonagem() {
  const { toggleAtualizarCombate } = useCombateStore();
  const { isOpen, data, onClose } = useCombatPersonagemModal();

  const personagemOriginal = data as Personagem | null;

  const [personagem, setPersonagem] = useState<Personagem | null>(null);

  useEffect(() => {
    if (isOpen && personagemOriginal && personagemOriginal.tipo === "personagem") {
      setPersonagem(personagemOriginal);
    } else {
      setPersonagem(null);
    }
  }, [isOpen, personagemOriginal]);

  if (!isOpen || !personagem) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;

    setPersonagem((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]:
          name === "nivel" ||
          name === "vida" ||
          name === "armadura" ||
          name === "pp" ||
          name === "iniciativa"
            ? Number(value)
            : value,
      };
    });
  }

  async function salvarPersonagem() {
    if (!personagem) return;

    const personagensSalvos =
      (await localforage.getItem<Personagem[]>("personagensEmCombate")) || [];

    const personagensAtualizados = personagensSalvos.map((p) =>
      p.id === personagem.id ? personagem : p
    );

    await localforage.setItem("personagensEmCombate", personagensAtualizados);

    toggleAtualizarCombate();
    onClose();
  }

  async function removerPersonagem() {
    if (!personagem) return;

    const personagensSalvos =
      (await localforage.getItem<Personagem[]>("personagensEmCombate")) || [];

    const personagensAtualizados = personagensSalvos.filter(
      (p) => p.id !== personagem.id
    );

    await localforage.setItem("personagensEmCombate", personagensAtualizados);

    toggleAtualizarCombate();
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Personagem em Combate</DialogTitle>
          <DialogDescription>
            Dados do personagem atualmente em combate.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            salvarPersonagem();
          }}
        >
          <ScrollArea className="h-[50vh] pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  name="nome"
                  value={personagem.nome}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="classe">Classe</Label>
                <Input
                  id="classe"
                  name="classe"
                  value={personagem.classe}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="raca">Raça</Label>
                <Input
                  id="raca"
                  name="raca"
                  value={personagem.raca}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="nivel">Nível</Label>
                <Input
                  id="nivel"
                  name="nivel"
                  type="number"
                  value={personagem.nivel}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="vida">Vida</Label>
                <Input
                  id="vida"
                  name="vida"
                  type="number"
                  value={personagem.vida}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="armadura">Armadura</Label>
                <Input
                  id="armadura"
                  name="armadura"
                  type="number"
                  value={personagem.armadura}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="pp">Pontos de Poder (PP)</Label>
                <Input
                  id="pp"
                  name="pp"
                  type="number"
                  value={personagem.pp}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="iniciativa">Iniciativa</Label>
                <Input
                  id="iniciativa"
                  name="iniciativa"
                  type="number"
                  value={personagem.iniciativa}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="notas">Notas</Label>
              <Textarea
                id="notas"
                name="notas"
                value={personagem.notas ?? ""}
                onChange={handleChange}
              />
            </div>
          </ScrollArea>

          <Button type="submit" className="w-full mt-2">
            Salvar
          </Button>
          <Button
            type="button"
            className="w-full mt-2"
            variant="destructive"
            onClick={removerPersonagem}
          >
            Remover do combate
          </Button>
          <Button
            type="button"
            className="w-full mt-2"
            onClick={onClose}
            variant="outline"
          >
            Cancelar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}