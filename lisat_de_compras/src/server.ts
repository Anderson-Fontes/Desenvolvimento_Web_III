import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import shoppingRoutes from './routes/shoppingRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite que aplicações de diferentes domínios se comuniquem [cite: 17]
app.use(bodyParser.json()); // Analisa o corpo das requisições HTTP em formato JSON [cite: 19]

// Nome do banco de dados sugerido no exercício [cite: 66]
const MONGO_URI = 'mongodb://localhost:27017/shopping-list';

// Conexão com o MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas da API
app.use('/api', shoppingRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});