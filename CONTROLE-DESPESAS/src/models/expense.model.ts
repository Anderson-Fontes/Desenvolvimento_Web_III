import { Schema, model, Document } from 'mongoose';

// Interface para tipagem do documento
export interface IExpense extends Document {
  description: string;
  amount: number;
  date: Date;
}

// Definição do Schema
const ExpenseSchema = new Schema<IExpense>({
  description: { type: String, required: true }, // [cite: 37]
  amount: { type: Number, required: true }, // [cite: 37]
  date: { type: Date, required: true } // [cite: 38]
});

// Cria e exporta o modelo 'Expense'
// O Mongoose criará a coleção 'expenses' no MongoDB [cite: 36]
export default model<IExpense>('Expense', ExpenseSchema);