import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import ClienteRoutes from "./routes/clientesRoutes";

const app = express();

// middlware para JSON
app.use(express.json());

// conexão ao MongoDB

mongoose.connect("mongodb://127.0.0.1:27017/cadastroDB")
.then(() => console.log("conectando ao MongoDB Compass"))
.catch((erro) => console.error("erro ao conectar:", erro));

// rotas API

app.use("/clientes", ClienteRoutes);

// servir front-end da pasta public
app.use(express.static(path.join(__dirname, "../public"))); 

// inicia o servidor

app.listen(3000, () =>{
    console.log("servidor rodando em http://localhost:3000")
});