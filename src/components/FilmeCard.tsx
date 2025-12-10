import { Link } from "react-router-dom";
import { type Filme } from "../schemas/FilmeSchema";

type FilmeCardProps = {
  filme: Filme;
  onDelete: (id: number) => void;
};

export default function FilmeCard({ filme, onDelete }: FilmeCardProps) {
  const handleDelete = () => {
    if (filme.id && window.confirm(`Tem certeza que deseja excluir o filme "${filme.titulo}"?`)) {
      onDelete(filme.id);
    }
  };

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={filme.imagem || "https://placehold.co/400x600?text=Filme"}
            className="img-fluid rounded-start"
            alt={filme.titulo}
            style={{ objectFit: "cover", height: "100%" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body d-flex flex-column">
            <div>
              <h5 className="card-title">{filme.titulo}</h5>
              <p className="card-text">{filme.descricao}</p>
              <p className="card-text">
                <small className="text-muted">
                  <strong>Gênero:</strong> {filme.genero} |
                  <strong> Duração:</strong> {filme.duracao} min |
                  <strong> Classificação:</strong> {filme.classificacao} anos
                </small>
              </p>
            </div>
            <div className="mt-auto">
              <Link
                to={`/filmes/editar/${filme.id}`}
                className="btn btn-warning btn-sm me-2"
              >
                Editar
              </Link>
              <button
                onClick={handleDelete}
                className="btn btn-danger btn-sm"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
