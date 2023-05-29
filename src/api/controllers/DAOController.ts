import { Request, Response } from 'express';

import { IDAO } from '../models/DAO';
import { DAOService } from '../services/DAOService';
import { BadRequestError } from '../errors/http/BadRequestError';
import { NotFoundError } from '../errors/http/NotFoundError';

export class DAOController {

    private daoService: DAOService;

    constructor() {
        this.daoService = new DAOService();

        this.queryListDAOs = this.queryListDAOs.bind(this);
        this.queryOneDAO = this.queryOneDAO.bind(this);
        this.createDAO = this.createDAO.bind(this);
    }

    public async queryListDAOs(req: Request, res: Response) {
        try {
            const daos = await this.daoService.findAll();
            
            res.send({'daos': daos});
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async queryOneDAO(req: Request, res: Response) {
        try {
            const { daoId } = req.params;
            const dao = await this.daoService.findOne(daoId);
            if (dao === undefined) throw new NotFoundError("DAO doesn't exist");
            
            res.send({"dao": dao});
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async createDAO(req: Request, res: Response) {
        try {
            const dao: IDAO = req.body.dao;
            await this.daoService.save(dao);

            res.send({});
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

}