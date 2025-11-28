// src/server.ts

import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Importação necessária para resolver problemas de CORS
import connectDB from './config/db';
import ordensServicoRoutes from './routes/ordensServicoRoutes';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Conectar ao Banco de Dados
connectDB();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares ---

// 1. CORS: Permite requisições de outras origens (incluindo o arquivo local 'null' do seu index.html)
// É crucial que este middleware esteja ANTES das rotas da API.
app.use(cors()); 

// 2. Middleware para processar JSON (necessário para receber dados no POST/PUT)
app.use(express.json());

// --- Rotas ---

// Rota de teste simples
app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Sistema de Ordem de Serviço (Backend)</h1><p>Acesse a API em /api/ordens</p>');
});

// Rotas da API de Ordens de Serviço
app.use('/api/ordens', ordensServicoRoutes);

// --- Iniciar o Servidor ---

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}. Acesse: http://localhost:${PORT}`);
});