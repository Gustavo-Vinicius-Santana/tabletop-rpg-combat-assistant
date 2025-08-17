export interface Personagem {
  id: string;
  tipo: "personagem";
  nome: string;
  classe: string;
  raca: string;
  nivel: string;
  vida: string;
  armadura: string;
  pp: string;
  dano: string;
  notas?: string;
  iniciativa: number;
}

export interface Inimigo {
  id: string;
  tipo: "inimigo";
  nome: string;
  vida: string;
  dano: string;
  armadura: string;
  ataque: string;
  iniciativa: number;
  notas?: string;
}