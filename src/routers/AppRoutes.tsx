import { Routes, Route } from "react-router-dom";

import FilmesList from "../pages/Filmes/FilmesList";
import IngressoPage from "../pages/Ingressos/IngressoPage";
import SalaPage from "../pages/Salas/SalaPage";
import SessoesPage from "../pages/Sessoes/SessoesPage";
import FilmeForm from "../pages/Filmes/FilmeForm";
import SalaForm from "../pages/Salas/SalaForm";
import IngressoForm from "../pages/Ingressos/IngressoForm";
import SessaoForm from "../pages/Sessoes/SessaoForm";

function AppRoutes() {
  return (
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<FilmesList />} />
        <Route path="/filmes" element={<FilmesList />} />
        <Route path="/filmes/novo" element={<FilmeForm />} />
        <Route path="/filmes/editar/:id" element={<FilmeForm />} />

        <Route path="/ingressos" element={<IngressoPage />} />
        <Route path="/ingressos/novo" element={<IngressoForm />} />
        <Route path="/ingressos/editar/:id" element={<IngressoForm />} />

        <Route path="/salas" element={<SalaPage />} />
        <Route path="/salas/novo" element={<SalaForm />} />
        <Route path="/salas/editar/:id" element={<SalaForm />} />
        
        <Route path="/sessoes" element={<SessoesPage />} />
        <Route path="/sessoes/novo" element={<SessaoForm />} />
        <Route path="/sessoes/editar/:id" element={<SessaoForm />} />
      </Routes>
    </div>
  )
}

export default AppRoutes;