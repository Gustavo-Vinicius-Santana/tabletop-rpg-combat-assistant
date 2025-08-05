"use client";

import { useSelectPersonagemModal } from "@/lib/stores/useModal"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/shadcn/components/dialog"

export default function ModalSelectPersonagem() {
  const { isOpen, onClose } = useSelectPersonagemModal();
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modal de selecionar personagem</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo eaque modi dicta expedita dignissimos laudantium nulla neque veniam blanditiis. Ad eligendi sunt placeat sit, temporibus aut necessitatibus similique dolore reiciendis.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}