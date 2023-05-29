import { Request, Response } from 'express';

import { IProposal } from '../models/Proposal';
import { DAOService } from '../services/DAOService';
import { ProposalService } from '../services/ProposalService';
import { BadRequestError } from '../errors/http/BadRequestError';
import { NotFoundError } from '../errors/http/NotFoundError';

export class ProposalController {

    private daoService: DAOService;
    private proposalService: ProposalService;

    constructor() {
        this.daoService = new DAOService();
        this.proposalService = new ProposalService();

        this.queryListProposals = this.queryListProposals.bind(this);
        this.queryOneProposal = this.queryOneProposal.bind(this);
        this.createProposal = this.createProposal.bind(this);
    }

    public async queryListProposals(req: Request, res: Response) {
        try {
            const { daoId } = req.params;
            const dao = await this.daoService.findOne(daoId);
            if (dao === undefined) throw new NotFoundError('DAO does not exist');

            const proposals = await this.proposalService.findByDAO(daoId);

            res.send({'proposals': proposals});
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async queryOneProposal(req: Request, res: Response) {
        try {
            const { daoId, proposalId } = req.params;
            const dao = await this.daoService.findOne(daoId);
            if (dao === undefined) throw new NotFoundError('DAO does not exist');

            const proposal = await this.proposalService.findOne(daoId, proposalId);
            if (proposal === undefined) throw new NotFoundError('Proposal does not exist');

            res.send({'proposal': proposal});
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async createProposal(req: Request, res: Response) {
        try {
            const { daoId } = req.params;
            const proposal: IProposal = req.body.proposal;
            if (daoId != proposal.daoId) throw new BadRequestError("DAO ID does not match");
            await this.proposalService.save(proposal);
            res.send({});
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

}