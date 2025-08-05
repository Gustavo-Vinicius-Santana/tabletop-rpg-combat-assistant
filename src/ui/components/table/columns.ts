import { ColumnDef } from "@tanstack/react-table";

export type Personagem = {
  nome: string;
  classe: string;
  raca: string;
  nivel: number;
  vida: number;
  armadura: number;
  pp: number;
};

export const columns: ColumnDef<Personagem>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
    enableSorting: false,
  },
    {
    accessorKey: "raca",
    header: "Raça",
    enableSorting: false,
  },
{
    accessorKey: "vida",
    header: "Vida",
    enableSorting: true,
  },
  {
    accessorKey: "armadura",
    header: "Armadura",
    enableSorting: true,
  },
  {
    accessorKey: "classe",
    header: "Classe",
    enableSorting: false,
  },
  {
    accessorKey: "nivel",
    header: "Nível",
    enableSorting: true,
  },
  {
    accessorKey: "pp",
    header: "PP",
    enableSorting: true,
  }
];