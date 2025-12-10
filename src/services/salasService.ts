import { api } from "./api";
import type { Sala } from "../schemas/SalaSchema";


const baseURL = "/salas";

export const salasService = {
  listar: async () => {
    const { data } = await api.get(baseURL);
    return data;
  },

  buscarPorId: async (id: number) => {
    const { data } = await api.get(`${baseURL}/${id}`);
    return data;
  },

  criar: async (salas: Sala) => {
    const { data } = await api.post(baseURL, salas);
    return data;
  },

  atualizar: async (id: number, salas: Sala) => {
    const { data } = await api.put(`${baseURL}/${id}`, salas);
    return data;
  },

  remover: async (id: number) => {
    await api.delete(`${baseURL}/${id}`);
  }
};
