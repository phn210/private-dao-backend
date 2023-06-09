import { model, Schema } from 'mongoose';

export interface IDAO {
    _id: string,           
    name: string,
    address: string,
    description: string,
    website: string,
    contact: string,
    tvr: number
}

const DAOSchema = new Schema<IDAO>({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    website: { type: String, required: true },
    contact: { type: String, required: true },
    tvr: { type: Number, required: true }
}, {
    strict: true,
    strictQuery: false,
    timestamps: true
})

export default model<IDAO>('DAO', DAOSchema);