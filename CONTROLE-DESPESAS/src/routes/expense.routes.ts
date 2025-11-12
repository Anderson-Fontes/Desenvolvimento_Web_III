import { Router } from 'express';
import * as controller from '../controllers/expense.controller';

const router = Router();

// Rota para obter o somatório (conforme PDF) [cite: 106, 107]
router.get('/total', controller.getTotalExpenses);

// Rotas CRUD
router.post('/', controller.createExpense); // [cite: 40]
router.get('/', controller.getExpenses); // [cite: 41]
router.put('/:id', controller.updateExpense); // [cite: 41]
router.delete('/:id', controller.deleteExpense); // [cite: 42]

export default router;