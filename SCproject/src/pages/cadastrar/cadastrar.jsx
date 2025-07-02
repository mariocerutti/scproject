import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import "../../firebase/config";
import "../../style/styles.css";

export default function Cadastrar() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  try {
    console.log("Firebase carregado:", auth, db);
  } catch (e) {
    console.error("Erro ao carregar Firebase:", e);
  }

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro("");

    if (senha !== confSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Armazena os dados adicionais no Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        nome,
        email,
        cnpj,
        empresa,
        criadoEm: new Date()
      });

      navigate("/login");
    }catch (err) {
  if (err.code === 'auth/email-already-in-use') {
    setErro("Este e-mail já está em uso. Faça login ou use outro endereço.");
  } else {
    setErro("Erro ao cadastrar: " + err.message);
  }
}
  };

  return (
    <div className="cadastrar-page">
      <div className="login-title">
        <h1>Suporte ao Cliente</h1>
      </div>

      <div className="login-container">
        <h2>Cadastrar</h2>
        <form onSubmit={handleCadastro}>
          <div className="input-group">
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="empresa">Empresa:</label>
            <input type="text" id="empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="cnpj">CNPJ:</label>
            <input type="text" id="cnpj" value={cnpj} onChange={(e) => setCnpj(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="confSenha">Confirmar Senha:</label>
            <input type="password" id="confSenha" value={confSenha} onChange={(e) => setConfSenha(e.target.value)} required />
          </div>

          {erro && <p style={{ color: "red" }}>{erro}</p>}

          <button type="submit">Cadastrar</button>
        </form>

        <div className="login-links">
          <p><Link to="/login">Login</Link></p>
          <p><Link to="/esquecisenha">Esqueci minha senha</Link></p>
        </div>
      </div>
    </div>
  );
}
