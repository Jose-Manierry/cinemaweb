// Assumindo que você usa esta interface estendida para a visualização
interface SessaoExpanded extends Sessao {
  filme: { titulo: string }; 
  sala: { numeroSala: number };
}

// src/pages/Sessoes/SessoesList.tsx
import React, { useState, useEffect } from 'react';
import { sessoesService } from '../../services/sessoesService';
// Importe a interface FilmeCard.tsx para usar no map
// import SessaoCard from '../../components/SessaoCard'; 

const SessoesList: React.FC = () => {
  const [sessoes, setSessoes] = useState<SessaoExpanded[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessoes = async () => {
    setLoading(true);
    setError(null);
    try {
      // O Json-Server retorna um array de SessaoExpanded graças ao _expand no service!
      const data = await sessoesService.getAll() as SessaoExpanded[]; 
      setSessoes(data);
    } catch (e) {
      setError('Erro ao carregar a lista de sessões.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessoes();
  }, []);

  if (loading) return <div className="text-center">Carregando sessões...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (sessoes.length === 0) return <div className="alert alert-info">Nenhuma sessão agendada.</div>;

  return (
    <div className="mt-5">
      <h3>🎬 Sessões Agendadas</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Filme</th>
            <th>Sala</th>
            <th>Data e Hora</th>
            <th>Preço (R$)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sessoes.map(sessao => (
            <tr key={sessao.id}>
              {/* Cruzamento de Dados (facilitado pelo Json-Server _expand) */}
              <td>{sessao.filme ? sessao.filme.titulo : 'Filme Desconhecido'}</td>
              <td>{sessao.sala ? `Sala ${sessao.sala.numeroSala}` : 'Sala Desconhecida'}</td>
              <td>{new Date(sessao.dataHora).toLocaleString('pt-BR')}</td>
              <td>R$ {sessao.precoIngresso.toFixed(2)}</td>
              <td>
                <button 
                  className="btn btn-sm btn-info"
                  // TODO: Implementar a lógica de venda de ingressos (Módulo 7)
                  // Redirecionar para IngressoPage ou abrir Modal
                  onClick={() => alert(`Iniciar venda para Sessão ID: ${sessao.id}`)}
                >
                  <i className="bi bi-ticket-fill"></i> Vender Ingresso
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SessoesList;