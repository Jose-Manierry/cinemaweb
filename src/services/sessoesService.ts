// src/services/sessoesService.ts
import {api} from './api';
import type { Sessao, SessaoPayload } from '../models/Sessao.model';

const BASE_URL = '/sessoes';

export const sessoesService = {
  // GET: Lista todas as sessões
  getAll: async (): Promise<Sessao[]> => {
    // Usando _expand para obter os dados completos de Filme e Sala diretamente do json-server
    // Isso é crucial para o requisito de visualização!
    const response = await api.get(`${BASE_URL}?_expand=filme&_expand=sala`);
    return response.data;
  },

  // POST: Agendamento de uma nova sessão
  create: async (data: SessaoPayload): Promise<Sessao> => {
    const response = await api.post(BASE_URL, data);
    return response.data;
  },
  
  // (Opcional) DELETE: Excluir sessão
  delete: async (id: string): Promise<void> => {
    await api.delete(`${BASE_URL}/${id}`);
  },
};