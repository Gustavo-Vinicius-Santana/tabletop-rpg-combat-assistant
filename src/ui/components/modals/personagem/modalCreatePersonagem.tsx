"use client";

import { useCreatePersonagemModal } from "@/lib/stores/useModal"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/shadcn/components/dialog"

export default function ModalCreatePersonagem() {
  const { isOpen, onClose } = useCreatePersonagemModal()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modal de criar personagem</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ea quos, perferendis architecto a eius. Debitis, iusto ullam! Id quidem quam deserunt corrupti similique perferendis, doloribus commodi. Sit, eveniet quibusdam!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}