import { create } from "zustand";

type CombateStore = {
  atualizarCombate: boolean;
  toggleAtualizarCombate: () => void;
};

export const useCombateStore = create<CombateStore>((set) => ({
  atualizarCombate: false,
  toggleAtualizarCombate: () =>
    set((state) => ({ atualizarCombate: !state.atualizarCombate })),
}));