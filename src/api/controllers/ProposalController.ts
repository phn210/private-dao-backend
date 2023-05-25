import { Request, Response } from 'express';

import { BadRequestError } from '../errors/http/BadRequestError';
import { NotFoundError } from '../errors/http/NotFoundError';

export class ProposalController {

    constructor() {
        this.queryListProposals = this.queryListProposals.bind(this);
        this.queryOneProposal = this.queryOneProposal.bind(this);
        this.createProposal = this.createProposal.bind(this);
    }

    public async queryListProposals(req: Request, res: Response) {
        try {
            res.send({})
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async queryOneProposal(req: Request, res: Response) {
        try {
            res.send({})
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async createProposal(req: Request, res: Response) {
        try {
            res.send({})
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

}