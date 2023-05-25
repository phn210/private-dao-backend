import Proposal, { IProposal } from "../models/Proposal";

export class ProposalService {

    constructor(){ }

    public async findOne(issuerId: string): Promise<IProposal | undefined> {
        return (await Proposal.findById(issuerId))?.toObject();
    }

    public async findAll(): Promise<IProposal[]> {
        return (await Proposal.find()).map(e => e.toObject());
    }

    public async findByProvider(providerId: string): Promise<IProposal[]> {
        return (await Proposal.find({ providerId: providerId })).map(e => e.toObject());
    }

    public async save(issuer: IProposal): Promise<IProposal> {
        return (await Proposal.findByIdAndUpdate(
            issuer._id,
            issuer,
            {upsert: true, new: true}
        ))
    }

}