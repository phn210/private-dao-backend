import mongoose, { Schema } from 'mongoose'

export interface FundDeposit {
    chainID: number;
    block: number;
    logIndex: number;
    txID: string;
    commitment: string;
    timestamp: number;
    leafIndex: number;
    tally: boolean;
}

const FundDepositSchema = new Schema<FundDeposit>({
    chainID: { type: Number, required: true },
    block: { type: Number, required: true },
    logIndex: { type: Number, required: true },
    txID: { type: String, required: true },
    timestamp: { type: Number, required: true },
    commitment: { type: String, required: true },
    leafIndex: { type: Number, required: false },
    tally: { type: Boolean, required: false },
})

export interface LeafInserted {
    id?: number;
    chainID: number;
    block: number;
    logIndex: number;
    txID: string;
    commitment: string;
    timestamp: number;
    contract?: string;
}

const LeafInsertedSchema = new Schema<LeafInserted>({
    id: { type: Number},
    chainID: { type: Number, required: true },
    block: { type: Number, required: true },
    logIndex: { type: Number, required: true },
    txID: { type: String, required: true },
    timestamp: { type: Number, required: true },
    commitment: { type: String, required: true },
    contract: {Type: String},
})

LeafInsertedSchema.pre('save', function(next) {
  this.id += 1;
  next();
});

LeafInsertedSchema.index({ block: 1, logIndex: 1, chainID: 1 }, { unique: true });

const FundModel = mongoose.model('Fund', FundDepositSchema)
const LeafModel = mongoose.model('Leaf', LeafInsertedSchema)



export { FundDepositSchema, FundModel, LeafModel }