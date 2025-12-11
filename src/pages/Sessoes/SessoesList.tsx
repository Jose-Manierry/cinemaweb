// src/pages/Sessoes/SessoesList.tsx
import React from 'react';
import type { Sessao } from '../../models/Sessao.model';
import type { Filme } from '../../models/Filme.model';
import type { Sala } from '../../models/Sala.model';

// Interface estendida para a visualização com dados completos
export interface SessaoExpanded extends Sessao {
  filme?: Filme; 
  sala?: Sala;
}

interface SessoesListProps {
  sessoes: SessaoExpanded[];
  loading: boolean;
  error: string | null;
  onDelete: (id: string) => void; // Adicionando a função de delete
}

const SessoesList: React.FC<SessoesListProps> = ({ sessoes, loading, error, onDelete }) => {
  if (loading) return <div className="text-center mt-5">Carregando sessões...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;
  if (sessoes.length === 0) return <div className="alert alert-info mt-5">Nenhuma sessão agendada.</div>;

  return (
    <div className="mt-5">
      <h3>🎬 Sessões Agendadas</h3>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
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
                <td>{sessao.filme ? sessao.filme.titulo : 'N/A'}</td>
                <td>{sessao.sala ? sessao.sala.nome : 'N/A'}</td>
                <td>{new Date(sessao.dataHora).toLocaleString('pt-BR')}</td>
                <td>R$ {sessao.precoIngresso.toFixed(2)}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(sessao.id)}
                  >
                    <i className="bi bi-trash-fill"></i> Excluir
                  </button>
                  <button 
                    className="btn btn-sm btn-info ms-2"
                    onClick={() => alert(`Função de venda de ingresso para a sessão ${sessao.id} não implementada.`)}
                  >
                    <i className="bi bi-ticket-fill"></i> Vender
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SessoesList;