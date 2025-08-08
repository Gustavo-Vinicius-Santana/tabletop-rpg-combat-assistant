"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import localforage from "localforage";

import CardInimigo from "@/ui/components/cards/cardInimigo";
import CardPersonagem from "@/ui/components/cards/cardPersonagem";
import {
  useCombatInimigoModal,
  useCombatPersonagemModal,
  useSelectInimigoModal,
  useSelectPersonagemModal,
} from "@/lib/stores/useModal";

import { useCombateStore } from "@/lib/stores/useCombat";

import type { Personagem, Inimigo } from "@/lib/types/type";  // <-- import dos types

type Combatente = Personagem | Inimigo;

export default function Page() {
  const { onOpen: openSelectPersonagem } = useSelectPersonagemModal();
  const { onOpen: openSelectInimigo } = useSelectInimigoModal();
  const { onOpen: openPersonagemCombatModal } = useCombatPersonagemModal();
  const { onOpen: openInimigoCombatModal } = useCombatInimigoModal();
  const { atualizarCombate } = useCombateStore();

  const [personagens, setPersonagens] = useState<Personagem[]>([]);
  const [inimigos, setInimigos] = useState<Inimigo[]>([]);

  const [turnoAtual, setTurnoAtual] = useState(0);
  const [rodadaAtual, setRodadaAtual] = useState(1);
  const [tempoCombate, setTempoCombate] = useState(0);

  // Carregar dados do localForage
  useEffect(() => {
    const carregarDados = async () => {
      const personagensSalvos = await localforage.getItem<Personagem[]>("personagensEmCombate");
      const inimigosSalvos = await localforage.getItem<Inimigo[]>("inimigosEmCombate");

      setPersonagens(personagensSalvos || []);
      setInimigos(inimigosSalvos || []);
    };

    carregarDados();
  }, [atualizarCombate]);

  const combatentes: Combatente[] = [...personagens, ...inimigos].sort(
    (a, b) => b.iniciativa - a.iniciativa
  );

  const proximoTurno = () => {
    const proximo = turnoAtual + 1;

    if (proximo >= combatentes.length) {
      setTurnoAtual(0);
      setRodadaAtual((prev) => prev + 1);
      setTempoCombate((prev) => prev + 6);
    } else {
      setTurnoAtual(proximo);
    }
  };

  const minutos = Math.floor(tempoCombate / 60);
  const segundos = tempoCombate % 60;
  const tempoFormatado = `${minutos}:${segundos.toString().padStart(2, "0")}`;

  return (
    <div className="w-full min-h-screen px-6 py-10 bg-background flex flex-col items-center">
      <h1 className="text-3xl font-bold text-foreground mb-6">Combate</h1>

      <div className="w-full max-w-4xl flex flex-col gap-4 mb-6">
        <div className="bg-muted border border-border p-4 rounded-md">
          <h2 className="text-lg font-semibold text-foreground mb-3">Estado do Combate</h2>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Turno atual: {turnoAtual + 1} / {combatentes.length}</p>
            <p>Rodada: {rodadaAtual}</p>
            <p>Tempo transcorrido: {tempoFormatado}</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-muted border border-border p-4 rounded-md flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">Combate</h2>

        <div className="sticky top-0 w-full bg-muted border border-border rounded-lg shadow-lg p-4 z-20 backdrop-blur-sm bg-opacity-90 transition-shadow duration-300 hover:shadow-xl flex flex-col items-center gap-3">
          <div className="flex gap-4 w-full max-w-sm">
            <button
              onClick={() => openSelectInimigo("inimigosEmCombate")}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md shadow-md transition"
            >
              Adicionar Inimigo
            </button>
            <button
              onClick={() => openSelectPersonagem("personagensEmCombate")}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md shadow-md transition"
            >
              Adicionar Personagem
            </button>
          </div>

          <button
            onClick={proximoTurno}
            className="w-48 bg-zinc-300 hover:bg-zinc-400 text-zinc-900 font-semibold py-2 rounded-md shadow-md transition"
          >
            {turnoAtual + 1 === combatentes.length ? "Próxima rodada" : "Próximo turno"}
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {combatentes.map((c, index) => {
            const ativo = index === turnoAtual;
            return (
              <div
                key={c.nome}
                onClick={() => {
                  if (c.tipo === "personagem") {
                    openPersonagemCombatModal(c);
                  } else {
                    openInimigoCombatModal(c);
                  }
                }}
                className={cn(
                  "relative transition-all rounded-md cursor-pointer",
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
                    key={c.id}
                    id={c.id}
                    tipo={c.tipo}
                    dano={c.dano}
                    nome={c.nome}
                    classe={c.classe}
                    raca={c.raca}
                    nivel={c.nivel}
                    vida={c.vida}
                    armadura={c.armadura}
                    pp={c.pp}
                    iniciativa={c.iniciativa}
                  />
                ) : (
                  <CardInimigo
                    key={c.id}
                    id={c.id}
                    tipo={c.tipo}
                    dano={c.dano}
                    nome={c.nome}
                    vida={c.vida}
                    armadura={c.armadura}
                    ataque={c.ataque}
                    iniciativa={c.iniciativa}
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