import { create } from "zustand";

// Tipos base
type ModalCreate = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

type ModalEdit = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

type ModalSelect = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};


export const useCreatePersonagemModal = create<ModalCreate>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useListPersonagemModal = create<ModalEdit>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useSelectPersonagemModal = create<ModalSelect>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

// Inimigo Modals
export const useCreateInimigoModal = create<ModalCreate>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useListInimigoModal = create<ModalEdit>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useSelectInimigoModal = create<ModalSelect>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));