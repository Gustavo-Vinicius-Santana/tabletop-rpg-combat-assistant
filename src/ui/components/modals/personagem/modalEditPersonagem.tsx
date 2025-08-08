"use client";

import { useEffect, useState } from "react";
import type { Personagem } from "@/lib/types/type";
import { useEditInimigoModal, useEditPersonagemModal } from "@/lib/stores/useModal";
import localforage from "localforage";
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
import { useListaStore } from "@/lib/stores/useLIstas";

export default function ModalEditPersonagem() {
  const { isOpen, data, onClose } = useEditPersonagemModal();
  const { toggleAtualizarLista } = useListaStore();

  const personagem = data as Personagem | null;

  const [form, setForm] = useState<Personagem | null>(null);

  // Carregar os dados do personagem no form local
  useEffect(() => {
    if (personagem && personagem.tipo === "personagem") {
      setForm(personagem);
    }
  }, [personagem]);

  const atualizar = (campo: keyof Personagem, valor: string | number) => {
    setForm((prev) => (prev ? { ...prev, [campo]: valor } : prev));
  };

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    const lista = (await localforage.getItem<Personagem[]>("personagens")) ?? [];

    const atualizada = lista.map((p) => (p.id === form.id ? form : p));

    await localforage.setItem("personagens", atualizada);

    toggleAtualizarLista();
    onClose();
    setForm(null);
  };

  if (!isOpen || !form || form.tipo !== "personagem") return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Editar Personagem</DialogTitle>
          <DialogDescription>
            Edite os dados do personagem e salve as alterações.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={salvar} className="flex flex-col gap-4">
          <ScrollArea className="h-[60vh] pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  name="nome"
                  value={form.nome}
                  onChange={(e) => atualizar("nome", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="classe">Classe</Label>
                <Input
                  id="classe"
                  name="classe"
                  value={form.classe}
                  onChange={(e) => atualizar("classe", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="raca">Raça</Label>
                <Input
                  id="raca"
                  name="raca"
                  value={form.raca}
                  onChange={(e) => atualizar("raca", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="nivel">Nível</Label>
                <Input
                  id="nivel"
                  name="nivel"
                  type="text"
                  value={form.nivel}
                  onChange={(e) => atualizar("nivel", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="vida">Vida</Label>
                <Input
                  id="vida"
                  name="vida"
                  type="text"
                  value={form.vida}
                  onChange={(e) => atualizar("vida", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="armadura">Armadura</Label>
                <Input
                  id="armadura"
                  name="armadura"
                  type="text"
                  value={form.armadura}
                  onChange={(e) => atualizar("armadura", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="pp">Pontos de Poder (PP)</Label>
                <Input
                  id="pp"
                  name="pp"
                  type="text"
                  value={form.pp}
                  onChange={(e) => atualizar("pp", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="iniciativa">Iniciativa</Label>
                <Input
                  id="iniciativa"
                  name="iniciativa"
                  type="number"
                  value={form.iniciativa}
                  onChange={(e) => atualizar("iniciativa", Number(e.target.value))}
                />
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="notas">Notas</Label>
              <Textarea
                id="notas"
                name="notas"
                value={form.notas ?? ""}
                onChange={(e) => atualizar("notas", e.target.value)}
              />
            </div>
          </ScrollArea>

          <div className="flex flex-col gap-2 mt-2">
            <Button type="submit" className="w-full">
              Salvar
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}