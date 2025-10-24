import { Request, Response } from 'express';
import Disco from '../models/Disco';

export const createDisco = async (req: Request, res: Response) => {
  try {
    const disco = new Disco(req.body);
    await disco.save();
    res.status(201).json(disco);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getAllDiscos = async (req: Request, res: Response) => {
  try {
    const discos = await Disco.find();
    res.status(200).json(discos);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getDiscoById = async (req: Request, res: Response) => {
  try {
    const disco = await Disco.findById(req.params.id);
    if (!disco) return res.status(404).json({ message: 'Disco não encontrado' });
    res.status(200).json(disco);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateDisco = async (req: Request, res: Response) => {
  try {
    const disco = await Disco.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!disco) return res.status(404).json({ message: 'Disco não encontrado' });
    res.status(200).json(disco);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const deleteDisco = async (req: Request, res: Response) => {
  try {
    const disco = await Disco.findByIdAndDelete(req.params.id);
    if (!disco) return res.status(404).json({ message: 'Disco não encontrado' });
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};