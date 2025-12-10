import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IngressoCard from "../../components/IngressoCard";
import { ingressosService } from "../../services/ingressosService";
import { sessoesService } from "../../services/sessoesService";
import { filmesService } from "../../services/filmesService";
import { salasService } from "../../services/salasService";
import { type Ingresso } from "../../schemas/IngressoSchema";
import { type Sessao } from "../../schemas/SessaoSchema";
import { type Filme } from "../../schemas/FilmeSchema";
import { type Sala } from "../../schemas/SalaSchema";

type IngressoDisplay = {
  id: number;
  filme: string;
  sala: string;
  sessao: string;
  assento: string;
  preco: number;
};

export default function IngressosPage() {
  const [ingressos, setIngressos] = useState<IngressoDisplay[]>([]);

  useEffect(() => {
    const carregarIngressos = async () => {
      const [ingressosData, sessoesData, filmesData, salasData] = await Promise.all([
        ingressosService.listar(),
        sessoesService.listar(),
        filmesService.listar(),
        salasService.listar(),
      ]);

      const ingressosDisplayData = ingressosData.map((ingresso: Ingresso) => {
        const sessao = sessoesData.find((s: Sessao) => s.id === ingresso.sessaoId);
        const filme = sessao ? filmesData.find((f: Filme) => f.id === sessao.filmeId) : undefined;
        const sala = sessao ? salasData.find((s: Sala) => s.id === sessao.salaId) : undefined;

        return {
          id: ingresso.id!,
          filme: filme?.titulo ?? "Filme não encontrado",
          sala: sala?.nome ?? "Sala não encontrada",
          sessao: sessao ? new Date(sessao.horario).toLocaleString() : "Sessão não encontrada",
          assento: ingresso.assento,
          preco: ingresso.valor,
        };
      });

      setIngressos(ingressosDisplayData);
    };

    carregarIngressos();
  }, []);

  return (
    <div>
      <h1>Ingressos</h1>

      <Link className="btn btn-primary mb-3" to="/ingressos/novo">
        + Nova Venda
      </Link>

      {ingressos.map((i) => (
        <IngressoCard
          key={i.id}
          filme={i.filme}
          sala={i.sala}
          sessao={i.sessao}
          assento={i.assento}
          preco={i.preco}
        />
      ))}
    </div>
  );
}
