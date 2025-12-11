// src/pages/Sessoes/SessoesPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import SessaoForm from './SessaoForm';
import SessoesList, { type SessaoExpanded } from './SessoesList';
import { sessoesService } from '../../services/sessoesService';

const SessoesPage: React.FC = () => {
    const [sessoes, setSessoes] = useState<SessaoExpanded[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadSessoes = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await sessoesService.getAll();
            // A API com _expand pode não retornar o objeto se o ID for inválido
            // O ideal é garantir a integridade dos dados no backend
            setSessoes(data);
        } catch (e) {
            console.error(e);
            setError('Erro ao carregar a lista de sessões.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadSessoes();
    }, [loadSessoes]);

    const handleSessionCreated = () => {
        // Simplesmente recarrega a lista para exibir a nova sessão
        loadSessoes();
    };

    const handleDeleteSession = async (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir esta sessão?')) {
            try {
                await sessoesService.delete(id);
                // Recarrega a lista para refletir a exclusão
                loadSessoes();
                alert('Sessão excluída com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir sessão:', error);
                alert('Ocorreu um erro ao excluir a sessão.');
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <SessaoForm onSessionCreated={handleSessionCreated} />
                </div>
            </div>

            <SessoesList 
                sessoes={sessoes}
                loading={loading}
                error={error}
                onDelete={handleDeleteSession}
            />
        </div>
    );
};

export default SessoesPage;