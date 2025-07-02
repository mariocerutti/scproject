import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';
import '../../firebase/config';
import '../../style/styles.css';

export default function Esquecinha() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const handleRecuperarSenha = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');

    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setMensagem('E-mail de redefinição enviado com sucesso!');
    } catch (err) {
      setErro('Erro ao enviar e-mail. Verifique o endereço digitado.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-title">
        <h1>Suporte ao Cliente</h1>
      </div>

      <div className="login-container">
        <h2>Recuperar Senha</h2>
        <form onSubmit={handleRecuperarSenha}>
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

          {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
          {erro && <p style={{ color: 'red' }}>{erro}</p>}

          <button type="submit">Enviar link de redefinição</button>
        </form>

        <div className="login-links">
          <p><Link to="/">Voltar para o login</Link></p>
        </div>
      </div>
    </div>
  );
}
