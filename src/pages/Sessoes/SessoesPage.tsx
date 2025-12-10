import { useEffect, useState } from "react";
import SessaoCard from "./SessaoCard";
import { sessoesService } from "../../services/sessoesService";
import { filmesService } from "../../services/filmesService";
import { salasService } from "../../services/salasService";
import { type Sessao } from "../../schemas/SessaoSchema";
import { type Filme } from "../../schemas/FilmeSchema";
import { type Sala } from "../../schemas/SalaSchema";
import { Link } from "react-router-dom";

type SessaoDisplay = {
  id: number;
  filme: Filme;
  sala: Sala;
  horario: string;
};

export default function SessoesPage() {
  const [sessoes, setSessoes] = useState<SessaoDisplay[]>([]);

  useEffect(() => {
    const carregarSessoes = async () => {
      const [sessoesData, filmesData, salasData] = await Promise.all([
        sessoesService.listar(),
        filmesService.listar(),
        salasService.listar(),
      ]);

      const sessoesDisplayData = sessoesData.map((sessao: Sessao) => {
        const filme =
          filmesData.find((f: Filme) => f.id === sessao.filmeId) ?? {
            id: 0,
            titulo: "Filme não encontrado",
            genero: "",
            duracao: 0,
            classificacao: "",
            imagem: "",
          };

        const sala =
          salasData.find((s: Sala) => s.id === sessao.salaId) ?? {
            id: 0,
            nome: "Sala não encontrada",
            capacidade: 0,
          };

        return {
          id: sessao.id!,
          filme: filme,
          sala: sala,
          horario: new Date(sessao.horario).toLocaleString(),
        };
      });

      setSessoes(sessoesDisplayData);
    };

    carregarSessoes();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Sessões</h1>

        <Link to="/sessoes/novo" className="btn btn-primary">
          Nova Sessão
        </Link>
      </div>

      {sessoes.map((s) => (
        <SessaoCard
          key={s.id}
          filme={s.filme}
          sala={s.sala}
          horario={s.horario}
        />
      ))}
    </div>
  );
}
