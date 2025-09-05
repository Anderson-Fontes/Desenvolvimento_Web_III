import mongoose, { Schema, Document } from 'mongoose';

export interface IShoppingItem extends Document {
  name: string;
  price: number;
}

const ShoppingItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

// O nome da coleção será 'shoppingitems', conforme a sugestão do exercício [cite: 67]
export default mongoose.model<IShoppingItem>('ShoppingItem', ShoppingItemSchema, 'shoppingitems');