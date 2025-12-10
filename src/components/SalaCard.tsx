import { Link } from "react-router-dom";
import { type Sala } from "../schemas/SalaSchema";

type SalaCardProps = {
  sala: Sala;
  onDelete: (id: number) => void;
};

export default function SalaCard({ sala, onDelete }: SalaCardProps) {
  const handleDelete = () => {
    if (sala.id && window.confirm(`Tem certeza que deseja excluir a sala "${sala.nome}"?`)) {
      onDelete(sala.id);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title">{sala.nome}</h5>
          <p className="card-text mb-0">Capacidade: {sala.capacidade} pessoas</p>
        </div>
        <div>
          <Link
            to={`/salas/editar/${sala.id}`}
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
  );
}
