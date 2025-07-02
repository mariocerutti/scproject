import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    setErro('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const uid = userCredential.user.uid;

      // Buscar dados do usuário (nome, cnpj, email...)
      const userDocRef = doc(db, 'usuarios', uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const dados = userSnap.data();
        const { nome, cnpj, email: emailDb } = dados;

        if (cnpj) {
          localStorage.setItem('cnpj', cnpj);
          localStorage.setItem('email', emailDb || email);
          if (nome) {
            localStorage.setItem('nome', nome);
          }
          navigate('/inicio');
        } else {
          setErro('CNPJ não encontrado. Contate o administrador.');
        }
      } else {
        setErro('Dados do usuário não encontrados no banco.');
      }
    } catch (err) {
      console.error('Erro no login:', err);
      setErro('Usuário ou senha inválidos!');
    }
  };

  return (
    <div className="login-page">
      <div className="login-title">
        <h1>Suporte ao Cliente</h1>
      </div>

      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {erro && <p style={{ color: 'red' }}>{erro}</p>}

          <button type="submit">Entrar</button>
        </form>

        <div className="login-links">
          <p><Link to="/esquecisenha">Esqueci minha senha</Link></p>
          <p><Link to="/cadastrar">Cadastre-se</Link></p>
        </div>
      </div>
    </div>
  );
}
