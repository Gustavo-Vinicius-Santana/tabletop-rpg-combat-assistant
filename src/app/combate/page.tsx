"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import CardInimigo from "@/ui/components/cards/cardInimigo";
import CardPersonagem from "@/ui/components/cards/cardPersonagem";

interface Personagem {
  tipo: "personagem";
  nome: string;
  classe: string;
  raca: string;
  nivel: number;
  vida: number;
  armadura: number;
  pp: number;
  iniciativa: number;
}

interface Inimigo {
  tipo: "inimigo";
  nome: string;
  vida: number;
  armadura: number;
  ataque: number;
  iniciativa: number;
}

type Combatente = Personagem | Inimigo;

const personagens: Personagem[] = [
  {
    tipo: "personagem",
    nome: "Arthas",
    classe: "Paladino",
    raca: "Humano",
    nivel: 10,
    vida: 120,
    armadura: 10,
    pp: 10,
    iniciativa: 15,
  },
  {
    tipo: "personagem",
    nome: "Thrall",
    classe: "Xamã",
    raca: "Orc",
    nivel: 12,
    vida: 140,
    armadura: 10,
    pp: 10,
    iniciativa: 12,
  },
];

const inimigos: Inimigo[] = [
  {
    tipo: "inimigo",
    nome: "Goblin",
    vida: 40,
    armadura: 6,
    ataque: 7,
    iniciativa: 14,
  },
  {
    tipo: "inimigo",
    nome: "Orc",
    vida: 70,
    armadura: 9,
    ataque: 10,
    iniciativa: 10,
  },
  {
    tipo: "inimigo",
    nome: "Troll",
    vida: 100,
    armadura: 12,
    ataque: 15,
    iniciativa: 8,
  },
  {
    tipo: "inimigo",
    nome: "Dragão",
    vida: 300,
    armadura: 25,
    ataque: 30,
    iniciativa: 5,
  },
];

export default function Page() {
  const combatentes: Combatente[] = [...personagens, ...inimigos].sort(
    (a, b) => b.iniciativa - a.iniciativa
  );

  const [turnoAtual, setTurnoAtual] = useState(0);

  const proximoTurno = () => {
    setTurnoAtual((prev) => (prev + 1) % combatentes.length);
  };

  return (
    <div className="w-full min-h-screen px-6 py-10 bg-background flex flex-col items-center">
      <h1 className="text-3xl font-bold text-foreground mb-6">Combate</h1>

      {/* Estado do combate */}
      <div className="w-full max-w-4xl flex flex-col gap-4 mb-6">
        <div className="bg-muted border border-border p-4 rounded-md">
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Estado do Combate
          </h2>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Turnos: {turnoAtual + 1}</p>
            <p>Rodadas: {Math.floor(turnoAtual / combatentes.length) + 1}</p>
            <p>Tempo transcorrido: 0:06</p>
          </div>
        </div>
      </div>

      {/* Lista de combate + ações */}
      <div className="w-full max-w-4xl bg-muted border border-border p-4 rounded-md flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">Combate</h2>
        {/* Botões fixos ao rolar */}
      <div
        className="
          sticky top-0 w-full
          bg-muted border border-border rounded-lg
          shadow-lg
          p-4
          z-20
          backdrop-blur-sm bg-opacity-90
          transition-shadow duration-300
          hover:shadow-xl
          flex flex-col items-center gap-3
        "
      >
        {/* Dois botões lado a lado */}
        <div className="flex gap-4 w-full max-w-sm">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md shadow-md transition">
            Adicionar Inimigo
          </button>
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md shadow-md transition">
            Adicionar Personagem
          </button>
        </div>

        {/* Botão Próximo turno centralizado */}
        <button
          onClick={proximoTurno}
          className="w-48 bg-zinc-300 hover:bg-zinc-400 text-zinc-900 font-semibold py-2 rounded-md shadow-md transition"
        >
          Próximo turno
        </button>
      </div>

        {/* Lista de combatentes */}
        <div className="flex flex-col gap-6">
          {combatentes.map((c, index) => {
            const ativo = index === turnoAtual;
            return (
              <div
                key={c.nome}
                className={cn(
                  "relative transition-all rounded-md",
                  ativo && "ring-2 ring-primary bg-primary/5 shadow-sm"
                )}
              >
                {ativo && (
                  <div className="absolute top-2 right-2 bg-primary text-zinc-900 text-xs px-2 py-1 rounded shadow">
                    É a vez dele!
                  </div>
                )}

                {c.tipo === "personagem" ? (
                  <CardPersonagem
                    nome={c.nome}
                    classe={c.classe}
                    raca={c.raca}
                    nivel={c.nivel}
                    vida={c.vida}
                    armadura={c.armadura}
                    pp={c.pp}
                  />
                ) : (
                  <CardInimigo
                    nome={c.nome}
                    vida={c.vida}
                    armadura={c.armadura}
                    ataque={c.ataque}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}