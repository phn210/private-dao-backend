import { Request, Response } from 'express';

import { BadRequestError } from '../errors/http/BadRequestError';
import { NotFoundError } from '../errors/http/NotFoundError';

import { getTree } from '../services/getTreeProofPath';

export class CommonController {

    constructor() {
        this.fetchMerkleTree = this.fetchMerkleTree.bind(this);
    }

    public async fetchMerkleTree(req: Request, res: Response) {
        try {
            let data = await getTree();
            res.status(200).send({data: data})
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

}