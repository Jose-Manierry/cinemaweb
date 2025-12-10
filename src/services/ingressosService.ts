import { api } from "./api";
import type { Ingresso } from "../schemas/IngressoSchema";

const baseURL = "/ingressos";

export const ingressosService = {
  listar: async (p0: { sessaoId: number; }) => {
    const { data } = await api.get(baseURL);
    return data;
  },

  buscarPorId: async (id: number) => {
    const { data } = await api.get(`${baseURL}/${id}`);
    return data;
  },

  criar: async (ingressos: Ingresso) => {
    const { data } = await api.post(baseURL, ingressos);
    return data;
  },

  atualizar: async (id: number, ingressos: Ingresso) => {
    const { data } = await api.put(`${baseURL}/${id}`, ingressos);
    return data;
  },

  remover: async (id: number) => {
    await api.delete(`${baseURL}/${id}`);
  }
};
