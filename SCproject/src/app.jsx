import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importar as páginas
import Login from "./pages/login/login";
import Cadastrar from "./pages/cadastrar/cadastrar";
import EsqueceuSenha from "./pages/esquecisenha/esquecisenha";
import Inicio from "./pages/inicio/inicio";
import Chamados from './pages/chamados/chamados.jsx';
import Ticket from './pages/ticket/ticket.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/esquecisenha" element={<EsqueceuSenha />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/chamados" element={<Chamados />} />
        <Route path="/ticket/:ticketId" element={<Ticket />} />
      </Routes>
    </Router>
  );
}

export default App;
