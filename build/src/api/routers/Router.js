"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routers = void 0;
const express_1 = require("express");
const LogMiddleware_1 = require("../middlewares/LogMiddleware");
const DAOController_1 = require("../controllers/DAOController");
const ProposalController_1 = require("../controllers/ProposalController");
class Routers {
    constructor() {
        this.router = (0, express_1.Router)();
        this.route();
    }
    route() {
        this.router.get('/daos', new LogMiddleware_1.LogMiddleware().use, (new DAOController_1.DAOController()).queryListDAOs);
        this.router.get('/daos/:daoId', new LogMiddleware_1.LogMiddleware().use, (new DAOController_1.DAOController()).queryOneDAO);
        this.router.post('/daos', new LogMiddleware_1.LogMiddleware().use, (new DAOController_1.DAOController()).createDAO);
        this.router.get('/daos/:daoId/proposals', new LogMiddleware_1.LogMiddleware().use, (new ProposalController_1.ProposalController()).queryListProposals);
        this.router.get('/daos/:daoId/proposals/:proposalId', new LogMiddleware_1.LogMiddleware().use, (new ProposalController_1.ProposalController()).queryOneProposal);
        this.router.post('/daos/:daoId/proposals/', new LogMiddleware_1.LogMiddleware().use, (new ProposalController_1.ProposalController()).createProposal);
    }
}
exports.Routers = Routers;
