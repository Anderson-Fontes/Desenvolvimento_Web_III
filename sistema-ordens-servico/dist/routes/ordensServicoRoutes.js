"use strict";
// src/routes/ordensServicoRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrdemServicoController_1 = require("../controllers/OrdemServicoController");
const router = (0, express_1.Router)();
// CRUD Routes
router.post('/', OrdemServicoController_1.criarOrdem); // POST /api/ordens (Criar)
router.get('/', OrdemServicoController_1.lerOrdens); // GET /api/ordens (Listagem e Filtros)
// Rotas que usam o ID
router.get('/:id', OrdemServicoController_1.lerOrdemPorId); // NOVO: GET /api/ordens/:id (Ler uma única ordem)
router.put('/:id', OrdemServicoController_1.atualizarOrdem); // PUT /api/ordens/:id (Atualizar)
router.delete('/:id', OrdemServicoController_1.excluirOrdem); // DELETE /api/ordens/:id (Excluir)
exports.default = router;
//# sourceMappingURL=ordensServicoRoutes.js.map