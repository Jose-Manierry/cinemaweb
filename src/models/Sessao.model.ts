import type { Filme } from './Filme.model';
import type { Sala } from './Sala.model';

/**
 * Representa o objeto de uma Sessão como retornado pela API.
 * Inclui os dados completos de Filme e Sala quando a API é chamada com `_expand`.
 */
export interface Sessao {
  id: string;
  filmeId: string; // Chave estrangeira para o Filme
  salaId: string;  // Chave estrangeira para a Sala
  dataHora: string;    // Data e hora em formato ISO 8601 (UTC)
  precoIngresso: number;

  // Propriedades opcionais preenchidas pelo `_expand` do json-server
  filme?: Filme; // Objeto Filme completo, se expandido
  sala?: Sala;   // Objeto Sala completo, se expandido
}

/**
 * Representa o payload de dados necessário para criar uma nova sessão.
 * É um subconjunto do modelo `Sessao`, omitindo o `id` gerado pelo servidor
 * e os campos `filme` e `sala` que são apenas para leitura.
 */
export type SessaoPayload = Omit<Sessao, 'id' | 'filme' | 'sala'>;