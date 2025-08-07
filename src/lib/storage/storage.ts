import localforage from "localforage";

export async function salvarLista<T>(chave: string, dados: T[]) {
  await localforage.setItem(chave, dados);
}

export async function carregarLista<T>(chave: string): Promise<T[]> {
  const data = await localforage.getItem<T[]>(chave);
  return data ?? [];
}

export async function adicionarItemNaLista<T>(chave: string, novoItem: T) {
  const lista = await carregarLista<T>(chave);
  lista.push(novoItem);
  await salvarLista(chave, lista);
}

export async function removerItemDaLista<T>(
  chave: string,
  filtro: (item: T) => boolean
) {
  const lista = await carregarLista<T>(chave);
  const novaLista = lista.filter(filtro);
  await salvarLista(chave, novaLista);
}

export async function limparTodosOsBancos() {
  const chaves = [
    "personagens",
    "inimigos",
    "personagensNaAventura",
    "personagensEmCombate",
    "inimigosEmCombate",
  ];

  for (const chave of chaves) {
    await localforage.removeItem(chave);
  }

  console.log("Todos os bancos foram limpos.");
}