// src/routes/eventos.routes.ts
import { Router } from 'express';
import { createEvento, getEventos, updateEvento, deleteEvento } from '../controllers/EventoController';

const router = Router();

// Rotas CRUD para Eventos
router.post('/', createEvento);         // POST /api/eventos - Criar
router.get('/', getEventos);            // GET /api/eventos - Ler (Listar e Buscar)
router.put('/:id', updateEvento);       // PUT /api/eventos/:id - Atualizar
router.delete('/:id', deleteEvento);    // DELETE /api/eventos/:id - Excluir

export default router;