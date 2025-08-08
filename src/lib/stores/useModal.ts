import { create } from "zustand";
import {Personagem, Inimigo} from "@/lib/types/type";

// Tipos base
type ModalCreate = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

type ModalList = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

type ModalSelect = {
  isOpen: boolean;
  key: string;
  onOpen: (key: string) => void;
  onClose: () => void;
};

type ModalOnCombat = {
  data: Personagem | Inimigo | null;
  isOpen: boolean;
  onOpen: (data: Personagem | Inimigo) => void;
  onClose: () => void;
}

type ModalEdit = {
  isOpen: boolean;
  data: Personagem | Inimigo | null;
  onOpen: (data: Personagem | Inimigo) => void;
  onClose: () => void;
}


export const useCreatePersonagemModal = create<ModalCreate>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useListPersonagemModal = create<ModalList>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useSelectPersonagemModal = create<ModalSelect>((set) => ({
  isOpen: false,
  key: "",
  onOpen: (key) => set({ isOpen: true, key }),
  onClose: () => set({ isOpen: false }),
}));

export const useCombatPersonagemModal = create<ModalOnCombat>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}))

export const useEditPersonagemModal = create<ModalEdit>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}))

// Inimigo Modals
export const useCreateInimigoModal = create<ModalCreate>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useListInimigoModal = create<ModalList>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useSelectInimigoModal = create<ModalSelect>((set) => ({
  isOpen: false,
  key: "",
  onOpen: (key) => set({ isOpen: true, key }),
  onClose: () => set({ isOpen: false }),
}));

export const useCombatInimigoModal = create<ModalOnCombat>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}))

export const useEditInimigoModal = create<ModalEdit>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}))