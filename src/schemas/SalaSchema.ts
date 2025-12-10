import { z } from "zod";

export const SalaSchema = z.object({
  id: z.number().optional(),
  nome: z.string(),
  capacidade: z.number().positive()
});

export type Sala = z.infer<typeof SalaSchema>;
