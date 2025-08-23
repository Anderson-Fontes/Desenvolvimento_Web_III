import mongoose, {Schema, Document} from "mongoose";

// interface que define como sera a estrutura de um Cliente no typescript

export interface ICliente extends Document {
   nome: string;
   email:string;
   telefone: string;
   criadoEm: Date;
}

// definindo o esquema (estrutura do documento no MongoBD)

const ClienteSchema: Schema = new Schema({
   nome: { type: String, required: true }, // campo obrigatorio
   emqil: { type: String, required: true, unique: true }, //nao pode repetir
   telefone: { type: String, reuired: true },
   criadoEm: { type: Date, default: Date.now}, // data automatica
});

// exportando o modelo para ser usado no CRUD

export default mongoose.model<ICliente>("Cliente", ClienteSchema);