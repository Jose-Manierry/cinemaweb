import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SalaCard from "../../components/SalaCard";
import { salasService } from "../../services/salasService";
import { type Sala } from "../../schemas/SalaSchema";

export default function SalasPage() {
  const [salas, setSalas] = useState<Sala[]>([]);

  const carregarSalas = async () => {
    try {
      const data = await salasService.listar();
      setSalas(data);
    } catch (error) {
      console.error("Erro ao carregar salas:", error);
    }
  };

  const removerSala = async (id: number) => {
    try {
      await salasService.remover(id);
      await carregarSalas();
    } catch (error) {
      console.error("Erro ao remover sala:", error);
      alert("Ocorreu um erro ao remover a sala.");
    }
  };

  useEffect(() => {
    carregarSalas();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Salas de Cinema</h2>
        <Link className="btn btn-primary" to="/salas/novo">
          + Nova Sala
        </Link>
      </div>

      <div>
        {salas.length > 0 ? (
          salas.map((sala) => (
            <SalaCard key={sala.id} sala={sala} onDelete={removerSala} />
          ))
        ) : (
          <p>Nenhuma sala encontrada. Clique em "+ Nova Sala" para adicionar a primeira!</p>
        )}
      </div>
    </div>
  );
}
