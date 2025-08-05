"use client";

import { useSelectInimigoModal } from "@/lib/stores/useModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/shadcn/components/dialog"

export default function ModalSelectInimigo() {
  const { isOpen, onClose } = useSelectInimigoModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modal de selecionar inimigos</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci tempore sit optio delectus beatae officia ex, odio sint quaerat doloribus, obcaecati voluptate quasi dolores quibusdam expedita? Quo laboriosam nemo voluptatibus!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}