import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type Filme, FilmeSchema } from "../../schemas/FilmeSchema";
import { filmesService } from "../../services/filmesService";

export default function FilmeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editando = Boolean(id);

  // State management for each form field
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [duracao, setDuracao] = useState(0);
  const [classificacao, setClassificacao] = useState(0);
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");

  // Load movie data when editing
  useEffect(() => {
    if (editando && id) {
      filmesService.buscarPorId(Number(id)).then((data) => {
        setTitulo(data.titulo);
        setGenero(data.genero);
        setDuracao(Number(data.duracao) || 0);
        setClassificacao(Number(data.classificacao) || 0);
        setDescricao(data.descricao || "");
        setImagem(data.imagem || "");
      });
    }
  }, [id, editando]);

  // Handle form submission
  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();

    // Assemble the filme object from individual states
    const filmeParaSalvar: Filme = {
      titulo,
      genero,
      duracao,
      classificacao,
      descricao,
      imagem,
    };

    // Validate the assembled object
    const validacao = FilmeSchema.safeParse(filmeParaSalvar);
    if (!validacao.success) {
      // Display the first validation error
      alert(validacao.error.issues[0].message);
      return;
    }

    try {
      if (editando) {
        await filmesService.atualizar(Number(id), filmeParaSalvar);
      } else {
        await filmesService.criar(filmeParaSalvar);
      }
      navigate("/filmes");
    } catch (error) {
      console.error("Erro ao salvar o filme:", error);
      alert("Ocorreu um erro ao salvar o filme. Tente novamente.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{editando ? "Editar Filme" : "Novo Filme"}</h2>

      <form onSubmit={salvar}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">
            Título
          </label>
          <input
            id="titulo"
            name="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="genero" className="form-label">
            Gênero
          </label>
          <input
            id="genero"
            name="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="duracao" className="form-label">
            Duração (min)
          </label>
          <input
            id="duracao"
            name="duracao"
            type="number"
            value={duracao}
            onChange={(e) => setDuracao(parseInt(e.target.value, 10) || 0)}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="classificacao" className="form-label">
            Classificação
          </label>
          <input
            id="classificacao"
            name="classificacao"
            type="number"
            value={classificacao}
            onChange={(e) =>
              setClassificacao(parseInt(e.target.value, 10) || 0)
            }
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="descricao" className="form-label">
            Descrição
          </label>
          <textarea
            id="descricao"
            name="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imagem" className="form-label">
            URL da Imagem
          </label>
          <input
            id="imagem"
            name="imagem"
            type="url"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-success">
          Salvar
        </button>
      </form>
    </div>
  );
}