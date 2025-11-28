// src/models/OrdemServico.ts

import mongoose, { Schema, Document } from 'mongoose';

// Interface para garantir o tipagem forte em TypeScript
export interface IOrdemServico extends Document {
    titulo: string;
    descricao: string;
    dataAbertura: Date;
    status: 'aberta' | 'em andamento' | 'concluída';
    prioridade: 'baixa' | 'média' | 'alta';
    responsavel?: string;
    setorSolicitante: string;
    prazoEstimado?: Date;
    valorServico: number; // Usaremos Number no Mongoose para representar Decimal
}

const OrdemServicoSchema: Schema = new Schema({
    titulo: { type: String, required: true, trim: true },
    descricao: { type: String, required: true },
    dataAbertura: { type: Date, default: Date.now }, // Gerada automaticamente
    status: {
        type: String,
        required: true,
        enum: ['aberta', 'em andamento', 'concluída'], // Valores permitidos
        default: 'aberta'
    },
    prioridade: {
        type: String,
        required: true,
        enum: ['baixa', 'média', 'alta'], // Valores permitidos
        default: 'média'
    },
    responsavel: { type: String, required: false }, // Opcional
    setorSolicitante: { type: String, required: true, trim: true },
    prazoEstimado: { type: Date, required: false }, // Opcional
    valorServico: { type: Number, required: true } // Representa o Decimal
});

// Exporta o modelo para ser usado no Controller
export default mongoose.model<IOrdemServico>('OrdemServico', OrdemServicoSchema);