import { useState } from "react";
import { Link } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import "../../style/main.css";

export default function Chamados() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assunto, setAssunto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("Aberto");
  const [mensagem, setMensagem] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");

    try {
      const cnpj = localStorage.getItem("cnpj");
      if (!cnpj) {
        setMensagem("CNPJ não encontrado. Verifique o login.");
        return;
      }

      const chamadosRef = collection(db, "empresas", cnpj, "chamados");
      const docRef = await addDoc(chamadosRef, {
        assunto,
        descricao,
        status,
        criadoEm: serverTimestamp(),
      });

      setMensagem(`Chamado criado! ID: ${docRef.id}`);
      setAssunto("");
      setDescricao("");
      setStatus("Aberto");
    } catch (error) {
      setMensagem("Erro ao cadastrar chamado: " + error.message);
    }
  };

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
        <h2>Cadastrar Novo Chamado</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="assunto">Assunto:</label>
            <input
              type="text"
              id="assunto"
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="descricao">Descrição:</label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Aberto">Aberto</option>
              <option value="Pendente">Pendente</option>
              <option value="Resolvido">Resolvido</option>
              <option value="Fechado">Fechado</option>
            </select>
          </div>

          <button type="submit">Enviar Chamado</button>
        </form>

        {mensagem && <p style={{ marginTop: "10px", color: "green" }}>{mensagem}</p>}
      </div>
    </div>
  );
}
