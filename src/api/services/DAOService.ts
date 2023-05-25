import DAO, { IDAO } from "../models/DAO";

export class DAOService {

    constructor(){ }

    public async findOne(issuerId: string): Promise<IDAO | undefined> {
        return (await DAO.findById(issuerId))?.toObject();
    }

    public async findAll(): Promise<IDAO[]> {
        return (await DAO.find()).map(e => e.toObject());
    }

    public async findByProvider(providerId: string): Promise<IDAO[]> {
        return (await DAO.find({ providerId: providerId })).map(e => e.toObject());
    }

    public async save(issuer: IDAO): Promise<IDAO> {
        return (await DAO.findByIdAndUpdate(
            issuer._id,
            issuer,
            {upsert: true, new: true}
        ))
    }

}