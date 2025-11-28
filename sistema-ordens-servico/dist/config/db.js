"use strict";
// src/config/db.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ordens_servico';
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(uri);
        console.log('MongoDB conectado com sucesso!');
    }
    catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
        process.exit(1); // Encerra o processo em caso de falha
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map