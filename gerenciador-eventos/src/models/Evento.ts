// src/models/Evento.ts
import mongoose, { Schema, Document } from 'mongoose';

// 1. Interface para tipagem em TypeScript
export interface IEvento extends Document {
  titulo: string;
  descricao?: string; // Opcional
  data: Date;
  local: string;
  valor: number;
}

// 2. Definição do Schema do Mongoose
const EventoSchema: Schema = new Schema({
  titulo: {
    type: String,
    required: [true, 'O título do evento é obrigatório.'],
    trim: true,
  },
  descricao: {
    type: String,
    required: false, // Opcional
  },
  data: {
    type: Date,
    required: [true, 'A data do evento é obrigatória.'],
  },
  local: {
    type: String,
    required: [true, 'O local do evento é obrigatório.'],
    trim: true,
  },
  valor: {
    type: Number,
    required: [true, 'O valor do evento é obrigatório.'],
    min: [0, 'O valor não pode ser negativo.'],
  },
}, {
  timestamps: true // Adiciona campos createdAt e updatedAt
});

// 3. Compilação e exportação do Modelo
const Evento = mongoose.model<IEvento>('Evento', EventoSchema);

export default Evento;