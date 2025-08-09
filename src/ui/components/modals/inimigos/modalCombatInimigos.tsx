"use client";

import { useState, useEffect } from "react";
import type { Inimigo } from "@/lib/types/type";
import { useCombatInimigoModal } from "@/lib/stores/useModal";
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

export default function ModalCombatInimigos() {
  const { toggleAtualizarCombate } = useCombateStore();
  const { isOpen, data, onClose } = useCombatInimigoModal();

  const inimigoOriginal = data as Inimigo | null;

  const [inimigo, setInimigo] = useState<Inimigo | null>(null);

  useEffect(() => {
    if (isOpen && inimigoOriginal && inimigoOriginal.tipo === "inimigo") {
      setInimigo(inimigoOriginal);
    } else {
      setInimigo(null);
    }
  }, [isOpen, inimigoOriginal]);

  if (!isOpen || !inimigo) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;

    setInimigo((prev) => {
      if (!prev) return null;

      // Se for iniciativa, converte para number, senão deixa string
      if (name === "iniciativa") {
        return { ...prev, [name]: Number(value) };
      }

      return { ...prev, [name]: value };
    });
  }

  async function salvarInimigo() {
    if (!inimigo) return;

    const inimigosSalvos = (await localforage.getItem<Inimigo[]>("inimigosEmCombate")) || [];

    const inimigosAtualizados = inimigosSalvos.map((i) =>
      i.id === inimigo.id ? inimigo : i
    );

    await localforage.setItem("inimigosEmCombate", inimigosAtualizados);

    toggleAtualizarCombate();
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Inimigo em Combate</DialogTitle>
          <DialogDescription>
            Informações do inimigo selecionado para o combate.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            salvarInimigo();
          }}
        >
          <ScrollArea className="h-[60vh] pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  name="nome"
                  value={inimigo.nome}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="vida">Vida</Label>
                <Input
                  id="vida"
                  name="vida"
                  value={inimigo.vida}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="armadura">Armadura</Label>
                <Input
                  id="armadura"
                  name="armadura"
                  value={inimigo.armadura}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="ataque">Ataque</Label>
                <Input
                  id="ataque"
                  name="ataque"
                  value={inimigo.ataque}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="iniciativa">Iniciativa</Label>
                <Input
                  id="iniciativa"
                  name="iniciativa"
                  type="number"
                  value={inimigo.iniciativa}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="notas">Notas</Label>
              <Textarea
                id="notas"
                name="notas"
                value={inimigo.notas ?? ""}
                onChange={handleChange}
              />
            </div>
          </ScrollArea>

          <Button type="submit" className="w-full mt-2">
            Salvar
          </Button>
          <Button type="button" className="w-full mt-2" onClick={onClose} variant="outline">
            Cancelar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}