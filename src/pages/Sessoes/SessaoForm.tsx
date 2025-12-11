// src/pages/Sessoes/SessaoForm.tsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SessaoSchema, type SessaoFormData } from '../../schemas/SessaoSchema';
import { sessoesService } from '../../services/sessoesService';
import { filmesService } from '../../services/filmesService';
import { salasService } from '../../services/salasService'; // Supondo que você criou este serviço
import type { Filme } from '../../models/Filme.model';
import type { Sala } from '../../models/Sala.model';

interface SessaoFormProps {
    onSessionCreated: () => void;
}

const SessaoForm: React.FC<SessaoFormProps> = ({ onSessionCreated }) => {
    const [filmes, setFilmes] = useState<Filme[]>([]);
    const [salas, setSalas] = useState<Sala[]>([]);
    const [loadingDropdowns, setLoadingDropdowns] = useState(true);

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting },
        reset
    } = useForm<SessaoFormData>({
        resolver: zodResolver(SessaoSchema),
        defaultValues: {
            filmeId: '',
            salaId: '',
            dataHora: '',
            precoIngresso: 30.00, // Valor inicial
        },
    });

    // Carrega Filmes e Salas ao montar o componente
    useEffect(() => {
        const loadDependencies = async () => {
            try {
                const loadedFilmes = await filmesService.listar();
                const loadedSalas = await salasService.listar();
                setFilmes(loadedFilmes);
                setSalas(loadedSalas);
            } catch (error) {
                console.error('Erro ao carregar filmes ou salas:', error);
                alert('Não foi possível carregar a lista de filmes e salas.');
            } finally {
                setLoadingDropdowns(false);
            }
        };
        loadDependencies();
    }, []);

    const onSubmit = async (data: SessaoFormData) => {
        try {
            // A conversão de string para número acontece aqui, se necessário no backend
            const payload = {
                ...data,
                precoIngresso: Number(data.precoIngresso),
            };
            await sessoesService.create(payload);
            alert('Sessão agendada com sucesso!');
            reset(); // Limpa o formulário
            onSessionCreated(); // Informa ao componente pai para atualizar a lista
        } catch (error) {
            console.error('Erro ao agendar sessão:', error);
            alert('Ocorreu um erro ao agendar a sessão.');
        }
    };

    const getFeedbackClass = (fieldName: keyof SessaoFormData) => errors[fieldName] ? 'is-invalid' : '';
    const getErrorMessage = (fieldName: keyof SessaoFormData) => errors[fieldName]?.message;

    if (loadingDropdowns) return <p>Carregando dados para agendamento...</p>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
            <h3>📅 Agendar Nova Sessão</h3>

            {/* Select de Filmes */}
            <div className="col-md-6">
                <label htmlFor="filmeId" className="form-label">Filme</label>
                <select 
                    className={`form-select ${getFeedbackClass('filmeId')}`} 
                    id="filmeId" 
                    {...register('filmeId')}
                >
                    <option value="">Selecione um Filme</option>
                    {filmes.map(filme => (
                        <option key={filme.id} value={filme.id}>{filme.titulo}</option>
                    ))}
                </select>
                <div className="invalid-feedback">{getErrorMessage('filmeId')}</div>
            </div>

            {/* Select de Salas */}
            <div className="col-md-6">
                <label htmlFor="salaId" className="form-label">Sala</label>
                <select 
                    className={`form-select ${getFeedbackClass('salaId')}`} 
                    id="salaId" 
                    {...register('salaId')}
                >
                    <option value="">Selecione uma Sala</option>
                    {salas.map(sala => (
                        <option key={sala.id} value={sala.id}>{sala.nome} (Cap: {sala.capacidade})</option>
                    ))}
                </select>
                <div className="invalid-feedback">{getErrorMessage('salaId')}</div>
            </div>

            {/* Data e Hora */}
            <div className="col-md-6">
                <label htmlFor="dataHora" className="form-label">Data e Hora da Sessão</label>
                <input 
                    type="datetime-local" 
                    className={`form-control ${getFeedbackClass('dataHora')}`} 
                    id="dataHora" 
                    {...register('dataHora')} 
                />
                <div className="invalid-feedback">{getErrorMessage('dataHora')}</div>
            </div>
            
            {/* Preço do Ingresso */}
            <div className="col-md-6">
                <label htmlFor="precoIngresso" className="form-label">Preço Base do Ingresso (R$)</label>
                <input 
                    type="number" 
                    step="0.01" 
                    className={`form-control ${getFeedbackClass('precoIngresso')}`} 
                    id="precoIngresso" 
                    {...register('precoIngresso', { valueAsNumber: true })}
                />
                <div className="invalid-feedback">{getErrorMessage('precoIngresso')}</div>
            </div>


            <div className="col-12 mt-4">
                <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                    {isSubmitting ? 'Agendando...' : 'Agendar Sessão'}
                </button>
            </div>
        </form>
    );
};

export default SessaoForm;