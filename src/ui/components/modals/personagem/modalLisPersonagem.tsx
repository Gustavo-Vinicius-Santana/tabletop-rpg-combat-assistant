"use client";

import { useListPersonagemModal } from "@/lib/stores/useModal"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/shadcn/components/dialog"

export default function ModalListPersonagem() {
  const { isOpen, onClose } = useListPersonagemModal()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modal listar personagem</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum tempore maiores iste nesciunt perferendis sed alias? Veritatis, ab magni itaque ad officiis amet mollitia eveniet, enim obcaecati temporibus tenetur perferendis?
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}