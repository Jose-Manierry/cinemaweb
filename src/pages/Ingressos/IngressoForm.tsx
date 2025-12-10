import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sessoesService } from "../../services/sessoesService";
import { ingressosService } from "../../services/ingressosService";
import { filmesService } from "../../services/filmesService";
import { salasService } from "../../services/salasService";
import { IngressoSchema, type Ingresso } from "../../schemas/IngressoSchema";
import { type Sessao } from "../../schemas/SessaoSchema";
import { type Filme } from "../../schemas/FilmeSchema";
import { type Sala } from "../../schemas/SalaSchema";

interface AssentoProps {
  sessao: Sessao | undefined;
  assentosOcupados: string[];
  selectedAssento: string;
  onAssentoChange: (assento: string) => void;
}

function Assento({
  sessao,
  assentosOcupados,
  selectedAssento,
  onAssentoChange,
}: AssentoProps) {
  const [sala, setSala] = useState<Sala>();

  useEffect(() => {
    if (sessao) {
      salasService.buscar(sessao.salaId).then(setSala);
    }
  }, [sessao]);

  if (!sala) {
    return <p>Selecione uma sessão para ver os assentos</p>;
  }

  return (
    <div className="mb-3">
      <label className="form-label">Assento</label>
      <div className="d-flex flex-wrap gap-2">
        {Array.from({ length: sala.capacidade }, (_, i) => i + 1).map(
          (assento) => {
            const assentoStr = assento.toString();
            const ocupado = assentosOcupados.includes(assentoStr);
            return (
              <button
                key={assento}
                type="button"
                className={`btn ${
                  ocupado
                    ? "btn-danger"
                    : selectedAssento === assentoStr
                    ? "btn-success"
                    : "btn-outline-primary"
                }`}
                disabled={ocupado}
                onClick={() => onAssentoChange(assentoStr)}
                style={{ width: "4rem" }}
              >
                {assento}
              </button>
            );
          }
        )}
      </div>
    </div>
  );
}

export default function IngressoForm() {
  const navigate = useNavigate();

  // Form handling
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Omit<Ingresso, "assento">>({
    resolver: zodResolver(IngressoSchema.omit({ assento: true })),
  });

  // Data from API
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [sessoes, setSessoes] = useState<Sessao[]>([]);

  // User selections
  const [selectedFilmeId, setSelectedFilmeId] = useState<number | null>(null);
  const [selectedSalaId, setSelectedSalaId] = useState<number | null>(null);
  const [selectedSessaoId, setSelectedSessaoId] = useState<number | null>(null);
  const [selectedAssento, setSelectedAssento] = useState<string>("");
  const [tipoIngresso, setTipoIngresso] = useState<"inteira" | "meia">(
    "inteira"
  );
  const [assentosOcupados, setAssentosOcupados] = useState<string[]>([]);

  // Derived state
  const [valor, setValor] = useState(0);

  // Fetch initial data
  useEffect(() => {
    filmesService.listar().then(setFilmes);
    salasService.listar().then(setSalas);
    sessoesService.listar().then(setSessoes);
  }, []);

  // Update final price when session or ticket type changes
  useEffect(() => {
    const sessao = sessoes.find((s) => s.id === selectedSessaoId);
    if (sessao) {
      const baseValor = sessao.valor;
      const newValor = tipoIngresso === "inteira" ? baseValor : baseValor / 2;
      setValor(newValor);
      setValue("valor", newValor);
    } else {
      setValor(0);
      setValue("valor", 0);
    }
  }, [selectedSessaoId, tipoIngresso, sessoes, setValue]);

  // Handle movie selection
  const handleFilmeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filmeId = Number(e.target.value);
    setSelectedFilmeId(filmeId);
    // Reset subsequent selections
    setSelectedSalaId(null);
    setSelectedSessaoId(null);
    setValue("sessaoId", 0);
  };

  // Handle room selection
  const handleSalaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const salaId = Number(e.target.value);
    setSelectedSalaId(salaId);
    // Reset subsequent selections
    setSelectedSessaoId(null);
    setValue("sessaoId", 0);
  };

  // Handle session selection
  const handleSessaoChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sessaoId = Number(e.target.value);
    setSelectedSessaoId(sessaoId);
    setValue("sessaoId", sessaoId);

    const ingressos = await ingressosService.listar({ sessaoId });
    const assentos = ingressos.map((i) => i.assento);
    setAssentosOcupados(assentos);
  };

  // Handle seat selection
  const handleAssentoChange = (assento: string) => {
    setSelectedAssento(assento);
  };

  const onSubmit = async (data: Omit<Ingresso, "assento">) => {
    if (!selectedSessaoId) {
      alert("Por favor, selecione uma sessão.");
      return;
    }
    if (!selectedAssento) {
      alert("Por favor, selecione um assento.");
      return;
    }
    try {
      await ingressosService.criar({ ...data, assento: selectedAssento });
      alert("Ingresso vendido com sucesso!");
      navigate("/ingressos");
    } catch (error) {
      console.error(error);
      alert("Erro ao vender ingresso");
    }
  };

  // Memoized lists for dropdowns
  const salasDisponiveis = useMemo(() => {
    if (!selectedFilmeId) return [];
    const sessoesDoFilme = sessoes.filter((s) => s.filmeId === selectedFilmeId);
    const salaIds = [...new Set(sessoesDoFilme.map((s) => s.salaId))];
    return salas.filter((s) => salaIds.includes(s.id!));
  }, [selectedFilmeId, sessoes, salas]);

  const sessoesDisponiveis = useMemo(() => {
    if (!selectedSalaId || !selectedFilmeId) return [];
    return sessoes.filter(
      (s) => s.filmeId === selectedFilmeId && s.salaId === selectedSalaId
    );
  }, [selectedSalaId, selectedFilmeId, sessoes]);

  const selectedSessao = useMemo(() => {
    return sessoes.find((s) => s.id === selectedSessaoId);
  }, [sessoes, selectedSessaoId]);

  return (
    <div className="container mt-4">
      <h2>Vender Ingresso</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Filme Dropdown */}
        <div className="mb-3">
          <label htmlFor="filmeId" className="form-label">
            Filme
          </label>
          <select
            id="filmeId"
            className="form-select"
            onChange={handleFilmeChange}
            defaultValue=""
          >
            <option value="" disabled>
              Selecione um filme
            </option>
            {filmes.map((filme) => (
              <option key={filme.id} value={filme.id}>
                {filme.titulo}
              </option>
            ))}
          </select>
        </div>

        {/* Sala Dropdown */}
        <div className="mb-3">
          <label htmlFor="salaId" className="form-label">
            Sala
          </label>
          <select
            id="salaId"
            className="form-select"
            onChange={handleSalaChange}
            value={selectedSalaId ?? ""}
            disabled={!selectedFilmeId}
          >
            <option value="" disabled>
              Selecione uma sala
            </option>
            {salasDisponiveis.map((sala) => (
              <option key={sala.id} value={sala.id}>
                {sala.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Sessao Dropdown */}
        <div className="mb-3">
          <label htmlFor="sessaoId" className="form-label">
            Sessão
          </label>
          <select
            id="sessaoId"
            {...register("sessaoId", { valueAsNumber: true })}
            className={`form-select ${errors.sessaoId ? "is-invalid" : ""}`}
            onChange={handleSessaoChange}
            value={selectedSessaoId ?? ""}
            disabled={!selectedSalaId}
          >
            <option value="" disabled>
              Selecione uma sessão
            </option>
            {sessoesDisponiveis.map((sessao) => (
              <option key={sessao.id} value={sessao.id}>
                {new Date(
                  `${sessao.data}T${sessao.horario}`
                ).toLocaleString()}
              </option>
            ))}
          </select>
          {errors.sessaoId && (
            <div className="invalid-feedback">{errors.sessaoId.message}</div>
          )}
        </div>

        {/* Other form fields */}
        <div className="mb-3">
          <label htmlFor="nomeCliente" className="form-label">
            Nome do Cliente
          </label>
          <input
            {...register("nomeCliente")}
            id="nomeCliente"
            className={`form-control ${
              errors.nomeCliente ? "is-invalid" : ""
            }`}
          />
          {errors.nomeCliente && (
            <div className="invalid-feedback">
              {errors.nomeCliente.message}
            </div>
          )}
        </div>

        <Assento
          sessao={selectedSessao}
          assentosOcupados={assentosOcupados}
          selectedAssento={selectedAssento}
          onAssentoChange={handleAssentoChange}
        />

        <div className="mb-3">
          <label htmlFor="tipoIngresso" className="form-label">
            Tipo de Ingresso
          </label>
          <select
            id="tipoIngresso"
            className="form-select"
            value={tipoIngresso}
            onChange={(e) =>
              setTipoIngresso(e.target.value as "inteira" | "meia")
            }
          >
            <option value="inteira">Inteira</option>
            <option value="meia">Meia</option>
          </select>
        </div>

        <div className="mb-3">
          <h4>Valor: R$ {valor.toFixed(2)}</h4>
        </div>

        <button type="submit" className="btn btn-primary">
          Vender
        </button>
      </form>
    </div>
  );
}