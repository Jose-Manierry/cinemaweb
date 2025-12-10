import { z } from "zod";

export const FilmeSchema = z.object({
  id: z.number().optional(),
  titulo: z.string().min(3, "O título deve ter no mínimo 3 caracteres"),
  descricao: z.string().optional(),
  genero: z.string().min(3, "O gênero deve ter no mínimo 3 caracteres"),
  duracao: z.number().min(1, "A duração deve ser maior que zero"),
  classificacao: z.number().positive("Informe a classificação"),
  imagem: z.string().optional(),
});

export type Filme = z.infer<typeof FilmeSchema>;
