import FilmesList from "./FilmesList";
import FilmeForm from "./FilmeForm";

export default function FilmesPage() {
  return (
    <div className="container mt-4">
      <h2>Gerenciar Filmes</h2>
      <FilmeForm />
      <hr />
      <FilmesList />
    </div>
  );
}
