"use client";

import { useState } from "react";
import localforage from "localforage";

import { useCreateInimigoModal } from "@/lib/stores/useModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/shadcn/components/dialog";
import { ScrollArea } from "@/ui/shadcn/components/scroll-area";
import { Input } from "@/ui/shadcn/components/input";
import { Textarea } from "@/ui/shadcn/components/textarea";
import { Label } from "@/ui/shadcn/components/label";
import { Button } from "@/ui/shadcn/components/button";
import { Inimigo } from "@/lib/types/type";

export default function ModalCreateInimigo() {
  const { isOpen, onClose } = useCreateInimigoModal();

  const [form, setForm] = useState<Inimigo>({
    id: crypto.randomUUID(),
    tipo: "inimigo",
    nome: "",
    vida: "",
    dano: "",
    armadura: "",
    ataque: "",
    iniciativa: 0,
  });

  const atualizar = (campo: keyof Inimigo, valor: string) => {
    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();

    const lista = (await localforage.getItem<Inimigo[]>("inimigos")) ?? [];
    lista.push(form);
    await localforage.setItem("inimigos", lista);

    onClose();
    setForm({
      id: "",
      tipo: "inimigo",
      nome: "",
      vida: "",
      dano: "",
      armadura: "",
      ataque: "",
      iniciativa: 0,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Criar Inimigo</DialogTitle>
          <DialogDescription>
            Preencha os dados para cadastrar um novo inimigo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={salvar} className="flex flex-col gap-4">
          <ScrollArea className="h-[60vh] pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={form.nome}
                  onChange={(e) => atualizar("nome", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="vida">Vida</Label>
                <Input
                  id="vida"
                  type="text"
                  inputMode="numeric"
                  value={form.vida}
                  onChange={(e) => atualizar("vida", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="armadura">Armadura</Label>
                <Input
                  id="armadura"
                  type="text"
                  inputMode="numeric"
                  value={form.armadura}
                  onChange={(e) => atualizar("armadura", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="ataque">Ataque</Label>
                <Input
                  id="ataque"
                  type="text"
                  inputMode="numeric"
                  value={form.ataque}
                  onChange={(e) => atualizar("ataque", e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="notas">Notas</Label>
              <Textarea
                id="notas"
                value={form.notas}
                onChange={(e) => atualizar("notas", e.target.value)}
              />
            </div>
          </ScrollArea>

          <Button type="submit" className="w-full mt-2">
            Criar Inimigo
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}