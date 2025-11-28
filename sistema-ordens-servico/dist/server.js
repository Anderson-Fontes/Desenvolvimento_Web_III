"use strict";
// src/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors")); // Importação necessária para resolver problemas de CORS
const db_1 = __importDefault(require("./config/db"));
const ordensServicoRoutes_1 = __importDefault(require("./routes/ordensServicoRoutes"));
// Carrega as variáveis de ambiente do arquivo .env
dotenv_1.default.config();
// Conectar ao Banco de Dados
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// --- Middlewares ---
// 1. CORS: Permite requisições de outras origens (incluindo o arquivo local 'null' do seu index.html)
// É crucial que este middleware esteja ANTES das rotas da API.
app.use((0, cors_1.default)());
// 2. Middleware para processar JSON (necessário para receber dados no POST/PUT)
app.use(express_1.default.json());
// --- Rotas ---
// Rota de teste simples
app.get('/', (req, res) => {
    res.send('<h1>Sistema de Ordem de Serviço (Backend)</h1><p>Acesse a API em /api/ordens</p>');
});
// Rotas da API de Ordens de Serviço
app.use('/api/ordens', ordensServicoRoutes_1.default);
// --- Iniciar o Servidor ---
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}. Acesse: http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map