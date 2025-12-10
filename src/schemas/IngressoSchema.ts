import { z } from "zod";

export const IngressoSchema = z.object({
  id: z.number().optional(),
  sessaoId: z.number(),
  nomeCliente: z.string(),
  assento: z.string(),
  valor: z.number().positive()
});

export type Ingresso = z.infer<typeof IngressoSchema>;
