"use client";

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

export default function ModalCombatInimigos() {
  const { isOpen, data, onClose } = useCombatInimigoModal();

  const inimigo = data as Inimigo | null;

  if (!isOpen || !inimigo || inimigo.tipo !== "inimigo") return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Inimigo em Combate</DialogTitle>
          <DialogDescription>
            Informações do inimigo selecionado para o combate.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4">
          <ScrollArea className="h-[60vh] pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" name="nome" defaultValue={inimigo.nome} readOnly />
              </div>

              <div>
                <Label htmlFor="vida">Vida</Label>
                <Input
                  id="vida"
                  name="vida"
                  type="text"
                  defaultValue={inimigo.vida}
                  readOnly
                />
              </div>

              <div>
                <Label htmlFor="armadura">Armadura</Label>
                <Input
                  id="armadura"
                  name="armadura"
                  type="text"
                  defaultValue={inimigo.armadura}
                  readOnly
                />
              </div>

              <div>
                <Label htmlFor="ataque">Ataque</Label>
                <Input
                  id="ataque"
                  name="ataque"
                  type="text"
                  defaultValue={inimigo.ataque}
                  readOnly
                />
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="notas">Notas</Label>
              <Textarea
                id="notas"
                name="notas"
                defaultValue={inimigo.notas ?? ""}
                readOnly
              />
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