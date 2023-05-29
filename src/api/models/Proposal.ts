import { model, Schema } from 'mongoose';

export interface IProposal {
    _id: string,
    daoId: string,
    proposalId: string,        
    title: string,
    description: string
}

const ProposalSchema = new Schema<IProposal>({
    _id: { type: String, required: true },
    daoId: { type: String, required: true },
    proposalId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
}, {
    strict: true,
    strictQuery: false,
    timestamps: true
})

export default model<IProposal>('Proposal', ProposalSchema);