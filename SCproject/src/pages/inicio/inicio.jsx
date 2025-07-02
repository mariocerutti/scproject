import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import "../../style/main.css";

export default function Inicio() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chamados, setChamados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    async function carregarChamados() {
      try {
        const cnpj = localStorage.getItem("cnpj");
        if (!cnpj) {
          console.error("CNPJ não encontrado.");
          return;
        }

        const chamadosRef = collection(db, "empresas", cnpj, "chamados");
        const q = query(chamadosRef, orderBy("criadoEm", "desc"));
        const querySnapshot = await getDocs(q);

        const listaChamados = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setChamados(listaChamados);
      } catch (error) {
        console.error("Erro ao carregar chamados:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarChamados();
  }, []);

  return (
    <div className="page">
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="toggle-btn" onClick={toggleSidebar}>
          {sidebarOpen ? "◀" : "▶"}
        </div>
        <nav className="menu">
          <ul>
            <li><Link to="/inicio">Início</Link></li>
            <li><Link to="/chamados">Cadastrar Chamado</Link></li>
          </ul>
        </nav>
      </div>

      <div className="main-content">
        <h2>Meus Chamados</h2>

        {carregando ? (
          <p>Carregando chamados...</p>
        ) : chamados.length === 0 ? (
          <p>Nenhum chamado encontrado.</p>
        ) : (
          chamados.map((chamado, index) => (
            <Link to={`/ticket/${chamado.id}`} key={chamado.id} className="ticket-link">
              <div className="ticket">
                <h3>#{index + 1} - {chamado.assunto}</h3>
                <p>Status: <strong>{chamado.status}</strong></p>
                <p><em>{chamado.descricao}</em></p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
