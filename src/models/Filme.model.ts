// src/models/Filme.model.ts
export interface Filme {
  id: string;
  titulo: string;
  genero: string;
  duracao: number;
  classificacao: number;
  descricao: string;
  imagem: string;
}
