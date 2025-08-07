"use client";

import { useEffect, useState } from "react";
import localForage from "localforage";

import { columns } from "@/ui/components/table/columns";
import { DataTable } from "@/ui/components/table/data-table";
import { Button } from "@/ui/shadcn/components/button";
import { useSelectPersonagemModal } from "@/lib/stores/useModal";
import { limparTodosOsBancos } from "@/lib/storage/storage";
import { useAventuraStore } from "@/lib/stores/useAventura";

import type { Personagem } from "@/lib/types/type"; // <-- use os types centralizados aqui

export default function Home() {
  const [data, setData] = useState<Personagem[]>([]);
  const { onOpen: openPersonagemModal } = useSelectPersonagemModal();
  const { atualizarAventura } = useAventuraStore();

  useEffect(() => {
    const loadPersonagensNaAventura = async () => {
      const stored = await localForage.getItem<Personagem[]>("personagensNaAventura");
      if (stored) {
        setData(stored);
      }
    };
    //limparTodosOsBancos();
    loadPersonagensNaAventura();
  }, [atualizarAventura]);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Personagens na Aventura</h1>

      <DataTable columns={columns} data={data} />

      <div className="w-1/2 md:w-1/4 mx-auto flex flex-col gap-2">
        <Button onClick={() => openPersonagemModal("personagensNaAventura")}>
          Adicionar Personagem
        </Button>
        <Button
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
