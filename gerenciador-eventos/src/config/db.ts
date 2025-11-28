// src/config/db.ts
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("A variável de ambiente MONGODB_URI não está definida.");
    }
    await mongoose.connect(uri);
    console.log('✅ Conexão com MongoDB (evento) realizada com sucesso!');
  } catch (error) {
    console.error('❌ Falha na conexão com o MongoDB:', error);
    process.exit(1); // Encerra o processo em caso de falha
  }
};