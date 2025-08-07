"use client";

import type { Inimigo } from "@/lib/types/type";
import { Checkbox } from "@/ui/shadcn/components/checkbox";
import { cn } from "@/lib/utils";

interface SelectableInimigoCardProps {
  inimigo: Inimigo;
  checked: boolean;
  onToggle: () => void;
}

export default function SelectableInimigoCard({
  inimigo,
  checked,
  onToggle,
}: SelectableInimigoCardProps) {
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
          <h2 className="text-lg font-bold text-foreground">{inimigo.nome}</h2>
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div>
              <strong className="text-foreground">Vida:</strong> {inimigo.vida}
            </div>
            <div>
              <strong className="text-foreground">Armadura:</strong> {inimigo.armadura}
            </div>
            <div>
              <strong className="text-foreground">Ataque:</strong> {inimigo.ataque}
            </div>
          </div>
        </div>
        <Checkbox checked={checked} onCheckedChange={onToggle} className="mt-1" />
      </div>
    </div>
  );
}