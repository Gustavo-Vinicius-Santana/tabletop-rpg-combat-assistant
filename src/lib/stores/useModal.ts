import { create } from "zustand";

type Personagem = {
  tipo: "personagem";
  nome: string;
  classe: string;
  raca: string;
  nivel: number;
  vida: number;
  armadura: number;
  pp: number;
  iniciativa: number;
  notas?: string;
};

type Inimigo = {
  tipo: "inimigo";
  nome: string;
  vida: number;
  armadura: number;
  ataque: number;
  notas?: string;
};

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

type ModalOnCombat = {
  data: Personagem | Inimigo | null;
  isOpen: boolean;
  onOpen: (data: Personagem | Inimigo) => void;
  onClose: () => void;
}


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

export const useCombatPersonagemModal = create<ModalOnCombat>((set) => ({
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

export const useCombatInimigoModal = create<ModalOnCombat>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}))