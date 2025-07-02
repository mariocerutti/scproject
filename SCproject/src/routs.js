import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/login/login.jsx';
import Cadastrar from './pages/cadastrar/cadastrar.jsx';
import EsqueceuSenha from './pages/esquecisenha/esqueceusenha.jsx';
import Inicio from './pages/inicio/inicio.jsx';
import Chamados from './pages/chamados/chamados.jsx';
import Ticket from './pages/ticket/ticket.jsx';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastrar />} />
        <Route path="/esqueci-senha" element={<EsqueceuSenha />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/chamados" element={<Chamados />} />
        <Route path="/ticket/:ticketId" element={<Ticket />} />
      </Routes>
    </BrowserRouter>
  );
}
