"use client";

import { useEffect, useState } from "react";
import type { Inimigo } from "@/lib/types/type";
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

export default function ModalEditInimigo() {
  const { isOpen, data, onClose } = useEditInimigoModal(); // nome está `useEditPersonagemModal`, mas edita inimigo
  const { toggleAtualizarLista } = useListaStore();

  const inimigo = data as Inimigo | null;

  const [form, setForm] = useState<Inimigo | null>(null);

  // Carrega os dados no estado ao abrir o modal
  useEffect(() => {
    if (inimigo && inimigo.tipo === "inimigo") {
      setForm(inimigo);
    }
  }, [inimigo]);

  const atualizar = (campo: keyof Inimigo, valor: string | number) => {
    setForm((prev) => (prev ? { ...prev, [campo]: valor } : prev));
  };

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    const lista = (await localforage.getItem<Inimigo[]>("inimigos")) ?? [];

    const atualizada = lista.map((i) => (i.id === form.id ? form : i));

    await localforage.setItem("inimigos", atualizada);

    toggleAtualizarLista();
    onClose();
    setForm(null);
  };

  if (!isOpen || !form || form.tipo !== "inimigo") return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Editar Inimigo</DialogTitle>
          <DialogDescription>
            Edite os dados do inimigo selecionado.
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
                <Label htmlFor="ataque">Ataque</Label>
                <Input
                  id="ataque"
                  name="ataque"
                  type="text"
                  value={form.ataque}
                  onChange={(e) => atualizar("ataque", e.target.value)}
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

          <div className="flex flex-col gap-2 mt-2 ">
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