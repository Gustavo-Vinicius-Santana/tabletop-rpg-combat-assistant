"use client";

import { useState } from "react";
import localforage from "localforage";

import { useCreatePersonagemModal } from "@/lib/stores/useModal";
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

interface Personagem {
  nome: string;
  classe: string;
  raca: string;
  nivel: string;
  vida: string;
  ataque: string;
  notas?: string;
  armadura?: string;
  pp?: string;
  iniciativa?: number;
}

export default function ModalCreatePersonagem() {
  const { isOpen, onClose } = useCreatePersonagemModal();

  const [form, setForm] = useState<Personagem>({
    nome: "",
    classe: "",
    raca: "",
    nivel: "",
    vida: "",
    ataque: "",
    notas: "",
    armadura: "",
    pp: "",
    iniciativa: 0,
  });

  const atualizar = (campo: keyof Personagem, valor: string | number) => {
    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();

    const lista = (await localforage.getItem<Personagem[]>("personagens")) ?? [];
    lista.push(form);
    await localforage.setItem("personagens", lista);

    onClose();
    setForm({
      nome: "",
      classe: "",
      raca: "",
      nivel: "",
      vida: "",
      ataque: "",
      notas: "",
      armadura: "",
      pp: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Criar Personagem</DialogTitle>
          <DialogDescription>
            Preencha os dados para criar um novo personagem.
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
                <Label htmlFor="classe">Classe</Label>
                <Input
                  id="classe"
                  value={form.classe}
                  onChange={(e) => atualizar("classe", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="raca">Raça</Label>
                <Input
                  id="raca"
                  value={form.raca}
                  onChange={(e) => atualizar("raca", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="nivel">Nível</Label>
                <Input
                  id="nivel"
                  type="text"
                  inputMode="numeric"
                  value={form.nivel}
                  onChange={(e) => atualizar("nivel", e.target.value)}
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
                <Label htmlFor="ataque">Ataque</Label>
                <Input
                  id="ataque"
                  type="text"
                  inputMode="numeric"
                  value={form.ataque}
                  onChange={(e) => atualizar("ataque", e.target.value)}
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
                <Label htmlFor="pp">Percepção passiva (PP)</Label>
                <Input
                  id="pp"
                  type="text"
                  value={form.pp}
                  onChange={(e) => atualizar("pp", parseInt(e.target.value || "0", 10))}
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
            Criar Personagem
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}