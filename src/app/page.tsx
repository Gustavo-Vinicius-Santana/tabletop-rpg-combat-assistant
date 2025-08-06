"use client";

import { useState } from "react";
import { columns, Personagem } from "@/ui/components/table/columns";
import { DataTable } from "@/ui/components/table/data-table";
import { Button } from "@/ui/shadcn/components/button";
import { useSelectInimigoModal, useSelectPersonagemModal } from "@/lib/stores/useModal";
import { on } from "events";

const initialData: Personagem[] = [
  {
    nome: "Arthas",
    classe: "Paladino",
    raca: "Humano",
    nivel: 10,
    vida: 120,
    armadura: 10,
    pp: 10,
  },
  {
    nome: "Thrall",
    classe: "Xamã",
    raca: "Orc",
    nivel: 12,
    vida: 140,
    armadura: 10,
    pp: 10,
  },
];

export default function Home() {
  const [data, setData] = useState<Personagem[]>(initialData);
  const { isOpen, onOpen } = useSelectPersonagemModal();
  const { onOpen: openMoster } = useSelectInimigoModal();

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Lista de Personagens</h1>

      <DataTable columns={columns} data={data} />

      <div className="w-1/2 md:w-1/4 mx-auto flex flex-col gap-2">
        <Button
          onClick={() => {
            onOpen();
          }}
        >
          Adicionar Personagem
        </Button>

        <Button
          variant="destructive"
          size="sm"
          onClick={() => setData([])}
        >
          Limpar Tabela
        </Button>
      </div>
    </div>
  );
}