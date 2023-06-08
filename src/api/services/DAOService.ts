import DAO, { IDAO } from "../models/DAO";

export class DAOService {

    constructor(){ }

    public async findOne(daoId: string): Promise<IDAO | undefined> {
        return (await DAO.findById(daoId))?.toObject();
    }

    public async findAll(): Promise<IDAO[]> {
        return (await DAO.find().sort({'_id': 1})).map(e => e.toObject());
    }

    public async save(dao: IDAO): Promise<IDAO> {
        return (await DAO.findByIdAndUpdate(
            dao._id,
            dao,
            {upsert: true, new: true}
        ))
    }

}