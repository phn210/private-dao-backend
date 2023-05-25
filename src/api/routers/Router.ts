import { Router } from 'express';
import { LogMiddleware } from '../middlewares/LogMiddleware';
import { DAORouter } from './DAORouter';
import { ProposalRouter } from './ProposalRouter';

export class Routers {
    public router: Router;

    constructor() {
        this.router = Router();
        this.route();
    }

    public route() {
        this.router.use('/daos', new LogMiddleware().use, new DAORouter().router);
        this.router.use('/proposals', new LogMiddleware().use, new ProposalRouter().router);
    }
}