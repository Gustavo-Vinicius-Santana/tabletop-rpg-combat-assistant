"use client";

import { columns, Personagem } from "@/ui/components/table/columns";
import { DataTable } from "@/ui/components/table/data-table";

const data: Personagem[] = [
  {
    nome: "Arthas",
    classe: "Paladino",
    raca: "Humano",
    nivel: 10,
    vida: 120,
    armadura: 10,
    pp: 10
  },
  {
    nome: "Thrall",
    classe: "Xamã",
    raca: "Orc",
    nivel: 12,
    vida: 140,
    armadura: 10,
    pp: 10
  },
];
export default function Home() {

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Personagens</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}