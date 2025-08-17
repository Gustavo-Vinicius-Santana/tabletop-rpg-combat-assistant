import { create } from "zustand";

type AventurasStores = {
  atualizarAventura: boolean;
  toggleAtualizarAventura: () => void;
};

export const useAventuraStore = create<AventurasStores>((set) => ({
  atualizarAventura: false,
  toggleAtualizarAventura: () =>
    set((state) => ({ atualizarAventura: !state.atualizarAventura })),
}));