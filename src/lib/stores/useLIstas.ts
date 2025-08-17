import { create } from "zustand";

type ListasStore = {
  atualizarLista: boolean;
  toggleAtualizarLista: () => void;
};

export const useListaStore = create<ListasStore>((set) => ({
  atualizarLista: false,
  toggleAtualizarLista: () =>
    set((state) => ({ atualizarLista: !state.atualizarLista })),
}));