// src/models/Sessao.model.ts
export interface Sessao {
  id: number;
  filmeId: number;
  salaId: number;
  dataHora: string; // Data e hora da sessão (ex: ISO string)
  precoIngresso: number;
}

export type SessaoPayload = Omit<Sessao, 'id'>;