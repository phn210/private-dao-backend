"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalController = void 0;
const DAOService_1 = require("../services/DAOService");
const ProposalService_1 = require("../services/ProposalService");
const BadRequestError_1 = require("../errors/http/BadRequestError");
const NotFoundError_1 = require("../errors/http/NotFoundError");
class ProposalController {
    constructor() {
        this.daoService = new DAOService_1.DAOService();
        this.proposalService = new ProposalService_1.ProposalService();
        this.queryListProposals = this.queryListProposals.bind(this);
        this.queryOneProposal = this.queryOneProposal.bind(this);
        this.createProposal = this.createProposal.bind(this);
    }
    async queryListProposals(req, res) {
        try {
            const { daoId } = req.params;
            const dao = await this.daoService.findOne(daoId);
            if (dao === undefined)
                throw new NotFoundError_1.NotFoundError('DAO does not exist');
            const proposals = await this.proposalService.findByDAO(daoId);
            res.send({ 'proposals': proposals });
        }
        catch (error) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }
    async queryOneProposal(req, res) {
        try {
            const { daoId, proposalId } = req.params;
            const dao = await this.daoService.findOne(daoId);
            if (dao === undefined)
                throw new NotFoundError_1.NotFoundError('DAO does not exist');
            const proposal = await this.proposalService.findOne(daoId, proposalId);
            if (proposal === undefined)
                throw new NotFoundError_1.NotFoundError('Proposal does not exist');
            res.send({ 'proposal': proposal });
        }
        catch (error) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }
    async createProposal(req, res) {
        try {
            const { daoId } = req.params;
            const proposal = req.body.proposal;
            if (daoId != proposal.daoId)
                throw new BadRequestError_1.BadRequestError("DAO ID does not match");
            await this.proposalService.save(proposal);
            res.send({});
        }
        catch (error) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }
}
exports.ProposalController = ProposalController;
