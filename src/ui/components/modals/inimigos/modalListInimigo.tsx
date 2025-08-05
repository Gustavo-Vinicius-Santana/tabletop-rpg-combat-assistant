"use client";

import { useListInimigoModal } from "@/lib/stores/useModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/shadcn/components/dialog"

export default function ModalListInimigo() {
  const { isOpen, onClose } = useListInimigoModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modal listar inimigos</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. At iusto assumenda sint provident quisquam aut, odio voluptate reprehenderit expedita doloremque? Fuga quia cupiditate quibusdam ducimus autem quas officiis eius dicta.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}