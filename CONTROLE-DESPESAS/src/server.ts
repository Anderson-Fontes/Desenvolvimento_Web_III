import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import expenseRoutes from './routes/expense.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Para o Express entender JSON
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (HTML, CSS, JS) da pasta 'views'
app.use(express.static(path.join(__dirname, 'views')));

// Rotas da API
app.use('/api/expenses', expenseRoutes);

// Rota principal para servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Conexão com o MongoDB
const MONGO_URI = 'mongodb://localhost:27017/controle-despesas'; // [cite: 36] (Mude se necessário)

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}. Acesse http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });