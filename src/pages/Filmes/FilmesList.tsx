import { useEffect, useState } from "react";
import { filmesService } from "../../services/filmesService";
import { Link } from "react-router-dom";
import { type Filme } from "../../schemas/FilmeSchema";
import FilmeCard from "../../components/FilmeCard";

export default function FilmesList() {
  const [filmes, setFilmes] = useState<Filme[]>([]);

  const carregarFilmes = async () => {
    try {
      const data = await filmesService.listar();
      setFilmes(data);
    } catch (error) {
      console.error("Erro ao carregar filmes:", error);
      alert(
        "Não foi possível carregar os filmes. Verifique se o servidor está rodando na porta 4000."
      );
    }
  };

  const remover = async (id: number) => {
    await filmesService.remover(id);
    carregarFilmes();
  };

  useEffect(() => {
    carregarFilmes();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Filmes em Cartaz</h2>
        <Link className="btn btn-primary" to="/filmes/novo">
          + Novo Filme
        </Link>
      </div>

      <div>
        {filmes.length > 0 ? (
          filmes.map((filme) => (
            <FilmeCard key={filme.id} filme={filme} onDelete={remover} />
          ))
        ) : (
          <p>Nenhum filme encontrado.</p>
        )}
      </div>
    </div>
  );
}
