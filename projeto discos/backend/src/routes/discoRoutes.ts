import { Router } from 'express';
import {
  createDisco,
  getAllDiscos,
  getDiscoById,
  updateDisco,
  deleteDisco
} from '../controllers/discoController';

const router = Router();

router.post('/discos', createDisco);       // Cadastrar
router.get('/discos', getAllDiscos);       // Listar
router.get('/discos/:id', getDiscoById);   // Obter 1 (para editar)
router.put('/discos/:id', updateDisco);    // Editar
router.delete('/discos/:id', deleteDisco); // Excluir

export default router;