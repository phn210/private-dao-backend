import { Request, Response } from 'express';

import { IProposal } from '../models/Proposal';
import { DAOService } from '../services/DAOService';
import { ProposalService } from '../services/ProposalService';
import { BadRequestError } from '../errors/http/BadRequestError';
import { NotFoundError } from '../errors/http/NotFoundError';
import { useDAO, useDAOManager } from '../../lib/networks/evm';
import { BigNumber, ethers } from 'ethers';

export class ProposalController {

    private daoService: DAOService;
    private proposalService: ProposalService;
    private chainId: number = 11155111;

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
            let proposalsData: any = {};

            const daoManagerContract = useDAOManager(this.chainId);
            if (daoManagerContract === undefined) throw new NotFoundError("Can not found DAOManager contract");

            const daoAddress = await daoManagerContract.daos(daoId);
            
            const daoContract = useDAO(this.chainId, daoAddress);
            if (daoContract === undefined) throw new NotFoundError("Can not found DAO contract");
            
            // const numProposals = await daoContract.proposalCount();
            const numProposals = 10;
            console.log(numProposals);

            const proposalIds = (await Promise.all([...Array(Number(numProposals)).keys()].map(async (index: number) => daoContract.proposalIds(index))))
                                .filter(e => Number(e) != 0).reverse();
            const [existedProposals, states] = await Promise.all([
                Promise.all(proposalIds.map(async (id: number) => daoContract.proposals(id))),
                Promise.all(proposalIds.map(async (id: number) => daoContract.state(id)))   
            ]);

            existedProposals.map((proposal, index) => {
                proposalsData[existedProposals[index][0].toString()] = {
                    ...proposals[index],
                    ...{
                        proposalId: existedProposals[index][0].toString(),
                        state: Number(states[index]),
                        forVotes: Number(existedProposals[index][1]),
                        againstVotes: Number(existedProposals[index][2]),
                        abstainVotes: Number(existedProposals[index][3]),
                        proposers: existedProposals[index][4].toHexString()
                    }
                }
                delete proposalsData[existedProposals[index][0].toString()]["_id"];
            })

            res.send({'proposals': proposalsData});
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
            const proposal = req.body.proposal;
            if (daoId != proposal.daoId) throw new BadRequestError("DAO ID does not match");
            proposal._id = `${proposal.daoId}-${proposal.proposalId}`;

            await this.proposalService.save(proposal);
            res.send({});
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

}