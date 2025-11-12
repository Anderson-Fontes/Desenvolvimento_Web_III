import { Request, Response } from 'express';
import Expense from '../models/expense.model';

// Criar nova despesa [cite: 40]
export const createExpense = async (req: Request, res: Response) => {
  try {
    const { description, amount, date } = req.body;

    // Validação básica [cite: 58]
    if (!description || !amount || !date) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
    if (amount <= 0) {
      return res.status(400).json({ error: 'O valor deve ser positivo.' });
    }

    const newExpense = new Expense({ description, amount, date });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar despesa' });
  }
};

// Listar todas as despesas [cite: 41]
export const getExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 }); // Ordena pelas mais recentes
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar despesas' });
  }
};

// Atualizar uma despesa [cite: 41]
export const updateExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description, amount, date } = req.body;

    // Validação [cite: 58]
    if (!description || !amount || !date) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { description, amount, date },
      { new: true } // Retorna o documento atualizado
    );

    if (!updatedExpense) {
      return res.status(404).json({ error: 'Despesa não encontrada' });
    }
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar despesa' });
  }
};

// Excluir uma despesa [cite: 42]
export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ error: 'Despesa não encontrada' });
    }
    res.json({ message: 'Despesa excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir despesa' });
  }
};

// Obter o somatório total das despesas (código do PDF) [cite: 89]
export const getTotalExpenses = async (req: Request, res: Response) => {
  try {
    const total = await Expense.aggregate([ // [cite: 90]
      {
        $group: { // [cite: 92]
          _id: null, // [cite: 93]
          totalAmount: { $sum: "$amount" } // [cite: 94]
        }
      }
    ]);

    // Caso não haja despesas, retornar total 0 [cite: 100]
    const totalAmount = total.length > 0 ? total[0].totalAmount : 0;
    res.json({ totalAmount }); // [cite: 101]
  } catch (error) {
    res.status(500).json({ error: 'Erro ao calcular o total das despesas' }); // [cite: 104]
  }
};