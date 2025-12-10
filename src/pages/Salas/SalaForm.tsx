import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type Sala, SalaSchema } from "../../schemas/SalaSchema";
import { salasService } from "../../services/salasService";

export default function SalaForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [nome, setNome] = useState("");
  const [capacidade, setCapacidade] = useState(0);

  useEffect(() => {
    if (isEditing && id) {
      salasService.buscarPorId(Number(id)).then((data) => {
        setNome(data.nome);
        setCapacidade(Number(data.capacidade) || 0);
      });
    }
  }, [id, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const salaData: Omit<Sala, "id"> = {
      nome,
      capacidade,
    };

    const validation = SalaSchema.safeParse(salaData);
    if (!validation.success) {
      alert(validation.error.issues[0].message);
      return;
    }

    try {
      if (isEditing) {
        await salasService.atualizar(Number(id), salaData as Sala);
      } else {
        await salasService.criar(salaData as Sala);
      }
      navigate("/salas");
    } catch (error) {
      console.error("Erro ao salvar a sala:", error);
      alert("Ocorreu um erro ao salvar a sala. Tente novamente.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{isEditing ? "Editar Sala" : "Nova Sala"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome da Sala
          </label>
          <input
            id="nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="capacidade" className="form-label">
            Capacidade
          </label>
          <input
            id="capacidade"
            name="capacidade"
            type="number"
            value={capacidade}
            onChange={(e) => setCapacidade(parseInt(e.target.value, 10) || 0)}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Salvar
        </button>
      </form>
    </div>
  );
}
