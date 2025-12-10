import { api } from "./api";
import { type Filme } from "../schemas/FilmeSchema";

const baseURL = "/filmes";

export const filmesService = {
  listar: async () => {
    const { data } = await api.get(baseURL);
    return data;
  },

  buscarPorId: async (id: number) => {
    const { data } = await api.get(`${baseURL}/${id}`);
    return data;
  },

  criar: async (filme: Filme) => {
    const { data } = await api.post(baseURL, filme);
    return data;
  },

  atualizar: async (id: number, filme: Filme) => {
    const { data } = await api.put(`${baseURL}/${id}`, filme);
    return data;
  },

  remover: async (id: number) => {
    await api.delete(`${baseURL}/${id}`);
  }
};
