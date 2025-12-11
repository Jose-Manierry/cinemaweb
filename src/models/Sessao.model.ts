// src/models/Sessao.model.ts
export interface Sessao {
  id: string;
  filmeId: string;
  salaId: string;
  dataHora: string; // Data e hora da sessão (ex: ISO string)
  precoIngresso: number;
}

export type SessaoPayload = Omit<Sessao, 'id'>;