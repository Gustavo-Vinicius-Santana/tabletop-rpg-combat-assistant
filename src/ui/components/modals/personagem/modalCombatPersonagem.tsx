"use client";

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

  if (!data) return null;
  if (!data || data.tipo !== "personagem") return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Personagem em Combate</DialogTitle>
          <DialogDescription>
            Dados do personagem atualmente em combate.
          </DialogDescription>
        </DialogHeader>

        {data && (
          <form className="flex flex-col gap-4">
            <ScrollArea className="h-[60vh] pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome</Label>
                  <Input id="nome" name="nome" value={data.nome} readOnly />
                </div>

                <div>
                  <Label htmlFor="classe">Classe</Label>
                  <Input id="classe" name="classe" value={data.classe} readOnly />
                </div>

                <div>
                  <Label htmlFor="raca">Raça</Label>
                  <Input id="raca" name="raca" value={data.raca} readOnly />
                </div>

                <div>
                  <Label htmlFor="nivel">Nível</Label>
                  <Input id="nivel" name="nivel" type="number" value={data.nivel} readOnly />
                </div>

                <div>
                  <Label htmlFor="vida">Vida</Label>
                  <Input id="vida" name="vida" type="number" value={data.vida} readOnly />
                </div>

                <div>
                  <Label htmlFor="armadura">Armadura</Label>
                  <Input id="armadura" name="armadura" type="number" value={data.armadura} readOnly />
                </div>

                <div>
                  <Label htmlFor="pp">Pontos de Poder (PP)</Label>
                  <Input id="pp" name="pp" type="number" value={data.pp} readOnly />
                </div>

                <div>
                  <Label htmlFor="iniciativa">Iniciativa</Label>
                  <Input id="iniciativa" name="iniciativa" type="number" value={data.iniciativa} readOnly />
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="notas">Notas</Label>
                <Textarea id="notas" name="notas" value={data.notas ?? ""} readOnly />
              </div>
            </ScrollArea>

            <Button type="button" className="w-full mt-2" onClick={onClose}>
              Fechar
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}