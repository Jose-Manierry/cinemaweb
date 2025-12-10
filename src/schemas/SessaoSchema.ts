// src/schemas/SessaoSchema.ts
import { z } from 'zod';

export const SessaoSchema = z.object({
  // Regra 1: Não permitir criar sessão sem selecionar um Filme e uma Sala.
  filmeId: z.number().int().positive('O Filme deve ser selecionado.'),
  salaId: z.number().int().positive('A Sala deve ser selecionada.'),
  
  // O valor do ingresso pode ser fixo ou validado.
  precoIngresso: z.number().positive('O preço do ingresso deve ser positivo.'),

  // Regra 2: A data da sessão não pode ser retroativa (anterior à data atual).
  dataHora: z.string().datetime({ message: 'Data e hora inválidas.' })
    .refine((dataString) => {
      const dataSessao = new Date(dataString);
      const dataAtual = new Date();
      // Remove segundos e milissegundos para comparação mais limpa, mas mantendo a hora.
      dataAtual.setSeconds(0, 0); 
      
      // Verifica se a data da sessão é igual ou posterior à data e hora atual.
      return dataSessao.getTime() >= dataAtual.getTime();
    }, {
      message: 'A data e hora da sessão não podem ser retroativas.',
    }),
});

export type SessaoFormData = z.infer<typeof SessaoSchema>;