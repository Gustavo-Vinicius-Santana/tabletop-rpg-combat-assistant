"use client";

import { useEffect, useState } from "react";
import localForage from "localforage";

import { columns, Personagem } from "@/ui/components/table/columns";
import { DataTable } from "@/ui/components/table/data-table";
import { Button } from "@/ui/shadcn/components/button";
import { useSelectPersonagemModal } from "@/lib/stores/useModal";

export default function Home() {
  const [data, setData] = useState<Personagem[]>([]);
  const { onOpen: openPersonagemModal } = useSelectPersonagemModal();

  // Carrega personagens da aventura salvos no localForage
  useEffect(() => {
    const loadPersonagensNaAventura = async () => {
      const stored = await localForage.getItem<Personagem[]>("personagensNaAventura");
      if (stored) {
        setData(stored);
      }
    };
    loadPersonagensNaAventura();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Personagens na Aventura</h1>

      <DataTable columns={columns} data={data} />

      <div className="w-1/2 md:w-1/4 mx-auto flex flex-col gap-2">
        <Button onClick={openPersonagemModal}>Adicionar Personagem</Button>
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