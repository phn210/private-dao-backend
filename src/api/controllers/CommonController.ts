import { Request, Response } from 'express';

import { BadRequestError } from '../errors/http/BadRequestError';
import { NotFoundError } from '../errors/http/NotFoundError';

export class CommonController {

    constructor() {
        this.fetchMerkleTree = this.fetchMerkleTree.bind(this);
    }

    public async fetchMerkleTree(req: Request, res: Response) {
        try {
            res.send({})
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

}