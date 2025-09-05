import { Request, Response } from 'express';
import ShoppingItem, { IShoppingItem } from '../models/ShoppingItem';

// Listar todos os itens
export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await ShoppingItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar itens.' });
  }
};

// Adicionar um novo item
export const addItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price } = req.body;
    const newItem: IShoppingItem = new ShoppingItem({ name, price: Number(price) });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar item.' });
  }
};

// Atualizar um item
export const updateItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const updatedItem = await ShoppingItem.findByIdAndUpdate(id, { name, price: Number(price) }, { new: true });
    if (!updatedItem) {
      res.status(404).json({ message: 'Item não encontrado.' });
      return;
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar item.'});
  }
};

// Excluir um item
export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedItem = await ShoppingItem.findByIdAndDelete(id);
    if (!deletedItem) {
      res.status(404).json({ message: 'Item não encontrado.' });
      return;
    }
    res.status(200).json({ message: 'Item excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir item.' });
  }
};