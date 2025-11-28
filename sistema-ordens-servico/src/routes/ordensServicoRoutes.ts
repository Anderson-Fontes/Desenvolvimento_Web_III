// src/routes/ordensServicoRoutes.ts

import { Router } from 'express';
import {
    criarOrdem,
    lerOrdens,
    lerOrdemPorId, // Novo
    atualizarOrdem,
    excluirOrdem,
} from '../controllers/OrdemServicoController';

const router = Router();

// CRUD Routes
router.post('/', criarOrdem);          // POST /api/ordens (Criar)
router.get('/', lerOrdens);            // GET /api/ordens (Listagem e Filtros)

// Rotas que usam o ID
router.get('/:id', lerOrdemPorId);     // NOVO: GET /api/ordens/:id (Ler uma única ordem)
router.put('/:id', atualizarOrdem);    // PUT /api/ordens/:id (Atualizar)
router.delete('/:id', excluirOrdem);   // DELETE /api/ordens/:id (Excluir)

export default router;