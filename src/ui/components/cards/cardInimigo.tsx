"use client";

interface CardInimigoProps {
  nome: string;
  vida: number;
  armadura: number;
  ataque: number;
  iniciativa?: number;
}

export default function CardInimigo({
  nome,
  vida,
  armadura,
  ataque,
  iniciativa,
}: CardInimigoProps) {
  return (
    <div className="bg-muted border border-border rounded-md p-6 max-w-md mx-auto shadow-sm space-y-4 text-sm text-muted-foreground">
      <h2 className="text-xl font-bold text-foreground text-center">{nome}</h2>
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
          <span className="font-semibold">Ataque</span>
          <span>{ataque}</span>
        </div>
        {iniciativa !== undefined && (
          <div className="flex flex-col items-center col-span-3">
            <span className="font-semibold">Iniciativa</span>
            <span>{iniciativa}</span>
          </div>
        )}
      </div>
    </div>
  );
}