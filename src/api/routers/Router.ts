import { Router } from 'express';
import { LogMiddleware } from '../middlewares/LogMiddleware';

import { DAOController } from "../controllers/DAOController";
import { ProposalController } from "../controllers/ProposalController";
import { CommonController } from '../controllers/CommonController';

export class Routers {
    public router: Router;

    constructor() {
        this.router = Router();
        this.route();
    }

    public route() {
        this.router.get('/daos', new LogMiddleware().use, (new DAOController()).queryListDAOs);

        this.router.get('/daos/:daoId', new LogMiddleware().use, (new DAOController()).queryOneDAO);

        this.router.post('/daos', new LogMiddleware().use, (new DAOController()).createDAO);

        this.router.get('/daos/:daoId/proposals', new LogMiddleware().use, (new ProposalController()).queryListProposals);

        this.router.get('/daos/:daoId/proposals/:proposalId', new LogMiddleware().use, (new ProposalController()).queryOneProposal);

        this.router.post('/daos/:daoId/proposals/', new LogMiddleware().use, (new ProposalController()).createProposal);

        this.router.get('/merkle-tree', (new CommonController()).fetchMerkleTree);
    }
}