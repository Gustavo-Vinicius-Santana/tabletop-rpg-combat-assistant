"use client";

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

export default function ModalCombatPersonagem() {
  const { isOpen, data, onClose } = useCombatPersonagemModal();

  const personagem = data as Personagem | null;

  if (!isOpen || !personagem || personagem.tipo !== "personagem") return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Personagem em Combate</DialogTitle>
          <DialogDescription>
            Dados do personagem atualmente em combate.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4">
          <ScrollArea className="h-[60vh] pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" name="nome" value={personagem.nome} readOnly />
              </div>

              <div>
                <Label htmlFor="classe">Classe</Label>
                <Input id="classe" name="classe" value={personagem.classe} readOnly />
              </div>

              <div>
                <Label htmlFor="raca">Raça</Label>
                <Input id="raca" name="raca" value={personagem.raca} readOnly />
              </div>

              <div>
                <Label htmlFor="nivel">Nível</Label>
                <Input id="nivel" name="nivel" type="text" value={personagem.nivel} readOnly />
              </div>

              <div>
                <Label htmlFor="vida">Vida</Label>
                <Input id="vida" name="vida" type="text" value={personagem.vida} readOnly />
              </div>

              <div>
                <Label htmlFor="armadura">Armadura</Label>
                <Input id="armadura" name="armadura" type="text" value={personagem.armadura} readOnly />
              </div>

              <div>
                <Label htmlFor="pp">Pontos de Poder (PP)</Label>
                <Input id="pp" name="pp" type="text" value={personagem.pp} readOnly />
              </div>

              <div>
                <Label htmlFor="iniciativa">Iniciativa</Label>
                <Input id="iniciativa" name="iniciativa" type="number" value={personagem.iniciativa} readOnly />
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="notas">Notas</Label>
              <Textarea id="notas" name="notas" value={personagem.notas ?? ""} readOnly />
            </div>
          </ScrollArea>

          <Button type="button" className="w-full mt-2" onClick={onClose}>
            Fechar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}