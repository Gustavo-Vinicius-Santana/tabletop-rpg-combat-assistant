"use client";

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

export default function ModalCreatePersonagem() {
  const { isOpen, onClose } = useCreatePersonagemModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Criar Personagem</DialogTitle>
          <DialogDescription>
            Preencha os dados para criar um novo personagem.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4">
          <ScrollArea className="h-[60vh] pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome" className="mb-4">Nome</Label>
                <Input id="nome" name="nome" />
              </div>

              <div>
                <Label htmlFor="classe" className="mb-4">Classe</Label>
                <Input id="classe" name="classe" />
              </div>

              <div>
                <Label htmlFor="raca" className="mb-4">Raça</Label>
                <Input id="raca" name="raca" />
              </div>

              <div>
                <Label htmlFor="nivel" className="mb-4">Nível</Label>
                <Input id="nivel" name="nivel" type="number" />
              </div>

              <div>
                <Label htmlFor="vida" className="mb-4">Vida</Label>
                <Input id="vida" name="vida" type="number" />
              </div>

              <div>
                <Label htmlFor="ataque" className="mb-4">Ataque</Label>
                <Input id="ataque" name="ataque" type="number" />
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="notas" className="mb-4">Notas</Label>
              <Textarea id="notas" name="notas" />
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