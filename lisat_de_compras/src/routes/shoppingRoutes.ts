import { Router } from 'express';
import { getItems, addItem, updateItem, deleteItem } from '../controllers/ShoppingItemController';

const router = Router();

router.get('/items', getItems);
router.post('/items', addItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

export default router;