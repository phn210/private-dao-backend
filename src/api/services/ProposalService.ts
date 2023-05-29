import Proposal, { IProposal } from "../models/Proposal";

export class ProposalService {

    constructor(){ }

    public async findOne(daoId: string, proposalId: string): Promise<IProposal | undefined> {
        return (await Proposal.findById(`${daoId}-${proposalId}`))?.toObject();
    }
    public async findByDAO(daoId: string): Promise<IProposal[]> {
        return (await Proposal.find({'daoId': daoId})).map(e => e.toObject());
    }

    public async save(proposal: IProposal): Promise<IProposal> {
        return (await Proposal.findByIdAndUpdate(
            proposal._id,
            proposal,
            {upsert: true, new: true}
        ))
    }

}