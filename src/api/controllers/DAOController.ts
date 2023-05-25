import { Request, Response } from 'express';

import { BadRequestError } from '../errors/http/BadRequestError';
import { NotFoundError } from '../errors/http/NotFoundError';

export class DAOController {

    constructor() {
        this.queryListDAOs = this.queryListDAOs.bind(this);
        this.queryOneDAO = this.queryOneDAO.bind(this);
        this.createDAO = this.createDAO.bind(this);
    }

    public async queryListDAOs(req: Request, res: Response) {
        try {
            res.send({})
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async queryOneDAO(req: Request, res: Response) {
        try {
            res.send({})
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async createDAO(req: Request, res: Response) {
        try {
            res.send({})
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

}