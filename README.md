Instruções para Rodar o Projeto Localmente

Requisitos:
1. Instale o Node.js (https://nodejs.org)
2. Verifique se o Node.js e o npm estão instalados:
   Abra o terminal e digite:
   node -v
   npm -v

Passos para rodar o projeto:

1. Baixe ou clone o projeto para sua máquina.
   Se for via Git:
   git clone https://github.com/seu-usuario/seu-projeto.git
   cd seu-projeto

   Ou descompacte o arquivo ZIP e abra a pasta do projeto.

2. Instale as dependências:
   npm install

3. Inicie o servidor de desenvolvimento:
   npm run dev

   Para permitir acesso de outros dispositivos na mesma rede:
   npm run dev -- --host

4. Acesse o sistema:
   No navegador, vá para http://localhost:5173

Observações:
- Certifique-se de que o Firebase esteja configurado corretamente no arquivo `firebase/config.js`.
- Se estiver usando Firestore, verifique as regras de segurança.
