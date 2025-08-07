"use client";

import { Checkbox } from "@/ui/shadcn/components/checkbox";
import { cn } from "@/lib/utils";

interface Personagem {
  id: string;
  nome: string;
  tipo: string;
  armadura: string;
  ataque: string;
  nivel: string;
  classe: string;
  raca: string;
  pp: string;
  vida: string;
  dano: string;
  iniciativa: number;
}

interface SelectablePersonagemCardProps {
  personagem: Personagem;
  checked: boolean;
  onToggle: () => void;
}

export default function SelectablePersonagemCard({
  personagem,
  checked,
  onToggle,
}: SelectablePersonagemCardProps) {
  return (
    <div
      onClick={onToggle}
      className={cn(
        "w-full max-w-md cursor-pointer rounded-md border p-4 transition-all",
        checked ? "bg-primary/10 border-primary" : "bg-muted border-border"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1 text-sm text-muted-foreground">
          <h2 className="text-lg font-bold text-foreground">{personagem.nome}</h2>
          <p>
            {personagem.classe} • {personagem.raca} • Nível {personagem.nivel}
          </p>
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div>
              <strong className="text-foreground">Vida:</strong> {personagem.vida}
            </div>
            <div>
              <strong className="text-foreground">Armadura:</strong> {personagem.armadura}
            </div>
            <div>
              <strong className="text-foreground">PP:</strong> {personagem.pp}
            </div>
          </div>
        </div>
        <Checkbox checked={checked} onCheckedChange={onToggle} className="mt-1" />
      </div>
    </div>
  );
}