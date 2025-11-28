"use strict";
// src/controllers/OrdemServicoController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluirOrdem = exports.atualizarOrdem = exports.lerOrdemPorId = exports.lerOrdens = exports.criarOrdem = void 0;
const OrdemServico_1 = __importDefault(require("../models/OrdemServico"));
const mongoose_1 = __importDefault(require("mongoose"));
// 1. Criar Ordem de Serviço
const criarOrdem = async (req, res) => {
    try {
        const novaOrdem = new OrdemServico_1.default(req.body);
        await novaOrdem.save();
        res.status(201).json(novaOrdem);
    }
    catch (error) {
        res.status(400).json({ message: 'Erro ao criar ordem de serviço.', error });
    }
};
exports.criarOrdem = criarOrdem;
// 2. Ler (Listagem geral, pesquisa e filtros)
const lerOrdens = async (req, res) => {
    try {
        const { titulo, status, prioridade, setor } = req.query;
        let query = {};
        if (titulo) {
            query.titulo = { $regex: titulo, $options: 'i' };
        }
        if (status) {
            query.status = status;
        }
        if (prioridade) {
            query.prioridade = prioridade;
        }
        if (setor) {
            query.setorSolicitante = setor;
        }
        const ordens = await OrdemServico_1.default.find(query);
        res.status(200).json(ordens);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar ordens de serviço.', error });
    }
};
exports.lerOrdens = lerOrdens;
// 3. NOVO: Ler Ordem de Serviço por ID
const lerOrdemPorId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'ID da Ordem inválido.' });
            return;
        }
        const ordem = await OrdemServico_1.default.findById(id);
        if (!ordem) {
            res.status(404).json({ message: 'Ordem de serviço não encontrada.' });
            return;
        }
        res.status(200).json(ordem);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar ordem de serviço.', error });
    }
};
exports.lerOrdemPorId = lerOrdemPorId;
// 4. Atualizar Ordem de Serviço
const atualizarOrdem = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'ID da Ordem inválido.' });
            return;
        }
        const ordemAtualizada = await OrdemServico_1.default.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!ordemAtualizada) {
            res.status(404).json({ message: 'Ordem de serviço não encontrada.' });
            return;
        }
        res.status(200).json(ordemAtualizada);
    }
    catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar ordem de serviço.', error });
    }
};
exports.atualizarOrdem = atualizarOrdem;
// 5. Excluir Ordem de Serviço
const excluirOrdem = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'ID da Ordem inválido.' });
            return;
        }
        const ordem = await OrdemServico_1.default.findById(id);
        if (!ordem) {
            res.status(404).json({ message: 'Ordem de serviço não encontrada.' });
            return;
        }
        if (ordem.status !== 'concluída') {
            res.status(403).json({ message: 'Apenas ordens concluídas podem ser excluídas.' });
            return;
        }
        await OrdemServico_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: 'Ordem de serviço excluída com sucesso.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao excluir ordem de serviço.', error });
    }
};
exports.excluirOrdem = excluirOrdem;
//# sourceMappingURL=OrdemServicoController.js.map