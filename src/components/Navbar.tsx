import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark px-3">
      <Link className="navbar-brand" to="/">CineWeb</Link>

      <ul className="navbar-nav">
        <li className="nav-item"><Link className="nav-link" to="/filmes">Filmes</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/salas">Salas</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/sessoes">Sessões</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/ingressos">Ingressos</Link></li>
        
      </ul>
    </nav>
  );



}
