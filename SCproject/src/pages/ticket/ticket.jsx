import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  updateDoc
} from "firebase/firestore";
import { db } from "../../firebase/config";
import "../../style/main.css";

export default function Ticket() {
  const { ticketId } = useParams();
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [chamado, setChamado] = useState(null);
  const [novoStatus, setNovoStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const cnpj = localStorage.getItem("cnpj");
  const nome = localStorage.getItem("nome") || "Usuário";

  useEffect(() => {
    if (!cnpj || !ticketId) return;

    const carregarChamado = async () => {
      const chamadoRef = doc(db, "empresas", cnpj, "chamados", ticketId);
      const docSnap = await getDoc(chamadoRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setChamado({ id: docSnap.id, ...data });
        setNovoStatus(data.status);
      }
      setLoading(false);
    };

    const mensagensRef = collection(
      db,
      "empresas",
      cnpj,
      "chamados",
      ticketId,
      "mensagens"
    );

    const unsubscribe = onSnapshot(mensagensRef, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMensagens(
        lista.sort((a, b) => {
          const timeA = a.criadoEm?.seconds || 0;
          const timeB = b.criadoEm?.seconds || 0;
          return timeA - timeB;
        })
      );
    });

    carregarChamado();
    return () => unsubscribe();
  }, [cnpj, ticketId]);

  const handleEnviarMensagem = async (e) => {
    e.preventDefault();
    if (!mensagem.trim()) return;

    const mensagensRef = collection(
      db,
      "empresas",
      cnpj,
      "chamados",
      ticketId,
      "mensagens"
    );

    await addDoc(mensagensRef, {
      texto: mensagem,
      criadoEm: serverTimestamp(),
      autor: nome,
    });

    setMensagem("");
  };

  const handleAtualizarStatus = async () => {
    const chamadoRef = doc(db, "empresas", cnpj, "chamados", ticketId);
    await updateDoc(chamadoRef, { status: novoStatus });
    alert("Status atualizado!");
  };

  if (loading || !chamado) return <p>Carregando chamado...</p>;

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
        <h2>Chamado #{ticketId}</h2>
        <p><strong>Assunto:</strong> {chamado.assunto}</p>
        <p><strong>Status:</strong> {chamado.status}</p>
        <p><strong>Descrição:</strong> {chamado.descricao}</p>

        <div style={{ marginTop: 20 }}>
          <label htmlFor="status">Alterar Status:</label>
          <select
            id="status"
            value={novoStatus}
            onChange={(e) => setNovoStatus(e.target.value)}
          >
            <option value="Aberto">Aberto</option>
            <option value="Pendente">Pendente</option>
            <option value="Resolvido">Resolvido</option>
            <option value="Fechado">Fechado</option>
          </select>
          <button onClick={handleAtualizarStatus} style={{ marginLeft: 10 }}>
            Atualizar
          </button>
        </div>

        <hr />

        <h3>Mensagens</h3>
        <div className="mensagens" style={{ marginBottom: 20 }}>
          {mensagens.map((msg) => (
            <div
              key={msg.id}
              className="mensagem"
              style={{
                backgroundColor: msg.autor === nome ? "#e0f7fa" : "#f1f1f1",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "8px",
              }}
            >
              <p><strong>{msg.autor}:</strong> {msg.texto}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleEnviarMensagem}>
          <textarea
            rows="3"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Digite sua resposta..."
            required
            style={{ width: "100%", padding: "10px" }}
          />
          <br />
          <button type="submit" style={{ marginTop: 10 }}>Enviar Mensagem</button>
        </form>
      </div>
    </div>
  );
}
