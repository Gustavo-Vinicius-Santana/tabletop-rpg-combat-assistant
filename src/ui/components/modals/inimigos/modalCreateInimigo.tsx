"use client";

import { useCreateInimigoModal } from "@/lib/stores/useModal"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/shadcn/components/dialog"

export default function ModalCreateInimigo() {
  const { isOpen, onClose } = useCreateInimigoModal();
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modal de criar inimigos</DialogTitle>
          <DialogDescription>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit necessitatibus similique nemo. Odio sapiente harum fuga error, eum dolores aspernatur laboriosam at veritatis dolor quas fugit quam modi facilis impedit!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}