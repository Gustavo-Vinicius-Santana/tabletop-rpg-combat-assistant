"use client";

import { useEffect, useState } from "react";
import localForage from "localforage";

import { columns } from "@/ui/components/table/columns";
import { DataTable } from "@/ui/components/table/data-table";
import { Button } from "@/ui/shadcn/components/button";
import { useSelectPersonagemModal } from "@/lib/stores/useModal";
import { useAventuraStore } from "@/lib/stores/useAventura";

import type { Personagem } from "@/lib/types/type";

export default function Home() {
  const [data, setData] = useState<Personagem[]>([]);
  const { onOpen: openPersonagemModal } = useSelectPersonagemModal();
  const { atualizarAventura } = useAventuraStore();

  useEffect(() => {
    const loadPersonagensNaAventura = async () => {
      const stored = await localForage.getItem<Personagem[]>(
        "personagensNaAventura"
      );
      if (stored) {
        setData(stored);
      }
    };
    loadPersonagensNaAventura();
  }, [atualizarAventura]);

  return (
    <div className="w-full min-h-screen px-4 py-8 bg-background flex flex-col items-center overflow-x-hidden">
      <h1 className="text-2xl font-bold text-center mb-6">
        Personagens na Aventura
      </h1>

      {/* Wrapper com scroll horizontal em telas pequenas */}
      <div className="w-full max-w-full overflow-x-auto">
        <DataTable columns={columns} data={data} />
      </div>

      {/* Botões responsivos */}
      <div className="w-full max-w-sm mx-auto mt-6 flex flex-col gap-2 px-2">
        <Button
          className="w-full"
          onClick={() => openPersonagemModal("personagensNaAventura")}
        >
          Adicionar Personagem
        </Button>
        <Button
          className="w-full"
          variant="destructive"
          size="sm"
          onClick={async () => {
            await localForage.removeItem("personagensNaAventura");
            setData([]);
          }}
        >
          Limpar Tabela
        </Button>
      </div>
    </div>
  );
}
