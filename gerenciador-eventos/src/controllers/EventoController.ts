// src/controllers/EventoController.ts
import { Request, Response } from 'express';
import Evento, { IEvento } from '../models/Evento';
import mongoose from 'mongoose';

// Função auxiliar para enviar resposta formatada
const sendResponse = (res: Response, statusCode: number, message: string, data: any = null) => {
  res.status(statusCode).json({ message, data });
};

// 1. Criar Evento (CREATE)
export const createEvento = async (req: Request, res: Response) => {
  try {
    const evento: IEvento = new Evento(req.body);
    await evento.save();
    sendResponse(res, 201, '✅ Evento criado com sucesso!', evento);
  } catch (error: any) {
    // Trata erros de validação do Mongoose
    if (error instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(error.errors).map(err => err.message);
      return sendResponse(res, 400, '❌ Erro de validação: ' + messages.join(', '), null);
    }
    sendResponse(res, 500, '❌ Erro ao criar evento.', error.message);
  }
};

// 2. Listar Eventos (READ - Todos ou por Título)
export const getEventos = async (req: Request, res: Response) => {
  try {
    const { titulo } = req.query;
    let query = {};
    
    // Pesquisar por título (case-insensitive)
    if (titulo) {
      query = { titulo: { $regex: new RegExp(titulo as string, 'i') } };
    }
    
    const eventos = await Evento.find(query).sort({ data: 1 });
    sendResponse(res, 200, '✅ Eventos listados com sucesso.', eventos);
  } catch (error: any) {
    sendResponse(res, 500, '❌ Erro ao listar eventos.', error.message);
  }
};

// 3. Atualizar Evento (UPDATE)
export const updateEvento = async (req: Request, res: Response) => {
  try {
    const eventoId = req.params.id;
    const eventoAtualizado = await Evento.findByIdAndUpdate(eventoId, req.body, { new: true, runValidators: true });

    if (!eventoAtualizado) {
      return sendResponse(res, 404, '❌ Evento não encontrado.');
    }
    sendResponse(res, 200, '✅ Evento atualizado com sucesso!', eventoAtualizado);
  } catch (error: any) {
     if (error instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(error.errors).map(err => err.message);
      return sendResponse(res, 400, '❌ Erro de validação: ' + messages.join(', '), null);
    }
    sendResponse(res, 500, '❌ Erro ao atualizar evento.', error.message);
  }
};

// 4. Excluir Evento (DELETE)
export const deleteEvento = async (req: Request, res: Response) => {
  try {
    const eventoExcluido = await Evento.findByIdAndDelete(req.params.id);

    if (!eventoExcluido) {
      return sendResponse(res, 404, '❌ Evento não encontrado.');
    }
    sendResponse(res, 200, '✅ Evento excluído com sucesso!');
  } catch (error: any) {
    sendResponse(res, 500, '❌ Erro ao excluir evento.', error.message);
  }
};