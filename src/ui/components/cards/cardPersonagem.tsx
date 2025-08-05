"use client";

interface CardPersonagemProps {
  nome: string;
  classe: string;
  raca: string;
  nivel: number;
  vida: number;
  armadura: number;
  pp: number;
}

export default function CardPersonagem({
  nome,
  classe,
  raca,
  nivel,
  vida,
  armadura,
  pp,
}: CardPersonagemProps) {
  return (
    <div className="bg-muted border border-border rounded-md p-6 max-w-md mx-auto shadow-sm space-y-4 text-sm text-muted-foreground">
      <h2 className="text-xl font-bold text-foreground text-center">{nome}</h2>
      <p className="text-center text-foreground">
        {classe} • {raca} • Nível {nivel}
      </p>
      <div className="grid grid-cols-3 gap-6 text-foreground">
        <div className="flex flex-col items-center">
          <span className="font-semibold">Vida</span>
          <span>{vida}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold">Armadura</span>
          <span>{armadura}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold">PP</span>
          <span>{pp}</span>
        </div>
      </div>
    </div>
  );
}