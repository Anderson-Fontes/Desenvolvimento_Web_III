// src/controllers/OrdemServicoController.ts

import { Request, Response } from 'express';
import OrdemServicoModel, { IOrdemServico } from '../models/OrdemServico';
import mongoose from 'mongoose';

// 1. Criar Ordem de Serviço
export const criarOrdem = async (req: Request, res: Response): Promise<void> => {
    try {
        const novaOrdem: IOrdemServico = new OrdemServicoModel(req.body);
        await novaOrdem.save();
        res.status(201).json(novaOrdem);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar ordem de serviço.', error });
    }
};

// 2. Ler (Listagem geral, pesquisa e filtros)
export const lerOrdens = async (req: Request, res: Response): Promise<void> => {
    try {
        const { titulo, status, prioridade, setor } = req.query;
        let query: any = {};

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

        const ordens = await OrdemServicoModel.find(query);
        res.status(200).json(ordens);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar ordens de serviço.', error });
    }
};

// 3. NOVO: Ler Ordem de Serviço por ID
export const lerOrdemPorId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'ID da Ordem inválido.' });
            return;
        }

        const ordem = await OrdemServicoModel.findById(id);

        if (!ordem) {
            res.status(404).json({ message: 'Ordem de serviço não encontrada.' });
            return;
        }

        res.status(200).json(ordem);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar ordem de serviço.', error });
    }
};

// 4. Atualizar Ordem de Serviço
export const atualizarOrdem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'ID da Ordem inválido.' });
            return;
        }

        const ordemAtualizada = await OrdemServicoModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true } 
        );

        if (!ordemAtualizada) {
            res.status(404).json({ message: 'Ordem de serviço não encontrada.' });
            return;
        }

        res.status(200).json(ordemAtualizada);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar ordem de serviço.', error });
    }
};

// 5. Excluir Ordem de Serviço
export const excluirOrdem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'ID da Ordem inválido.' });
            return;
        }

        const ordem = await OrdemServicoModel.findById(id);

        if (!ordem) {
            res.status(404).json({ message: 'Ordem de serviço não encontrada.' });
            return;
        }

        if (ordem.status !== 'concluída') {
             res.status(403).json({ message: 'Apenas ordens concluídas podem ser excluídas.' });
             return;
        }

        await OrdemServicoModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'Ordem de serviço excluída com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir ordem de serviço.', error });
    }
};