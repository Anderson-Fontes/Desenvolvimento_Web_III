import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import discoRoutes from './routes/discoRoutes';

const app = express();
const PORT = 3000;

// **IMPORTANTE**: Substitua pela sua string de conexão do MongoDB Compass/Atlas
// Exemplo: "mongodb://localhost:27017/colecao_discos"
const MONGO_URI = "mongodb://localhost:27017";

// Middlewares
app.use(cors()); // Permite comunicação entre frontend e backend
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// Rotas da API
app.use('/api', discoRoutes);

// Conexão com o MongoDB e inicialização do servidor
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso!');
    app.listen(PORT, () => {
      console.log(`Servidor backend rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
  });