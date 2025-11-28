import 'dotenv/config'; // Carrega as variáveis de ambiente do .env
import express from 'express';
import cors from 'cors'; // Necessário para evitar erros de CORS no frontend
import { connectDB } from './config/db';
import eventosRoutes from './routes/eventos.routes';

// Conectar ao Banco de Dados
connectDB();

const app = express();
// A porta é lida do .env, caso contrário usa 3000
const PORT = process.env.PORT || 3000; 

// --- Middlewares ---

// 1. Middleware CORS: Permite que outras origens (como seu index.html local)
//    façam requisições para a API.
app.use(cors());

// 2. Middleware JSON: Habilita o parsing de JSON no corpo da requisição POST/PUT
app.use(express.json()); 

// --- Rotas da API ---

// Rota inicial simples para verificar se o servidor está no ar
app.get('/', (req, res) => {
  res.send('API Gerenciador de Eventos está rodando!');
});

// Rotas para o CRUD de eventos
app.use('/api/eventos', eventosRoutes);

// --- Iniciar o Servidor ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});