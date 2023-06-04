"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAOController = void 0;
const DAOService_1 = require("../services/DAOService");
const NotFoundError_1 = require("../errors/http/NotFoundError");
class DAOController {
    constructor() {
        this.daoService = new DAOService_1.DAOService();
        this.queryListDAOs = this.queryListDAOs.bind(this);
        this.queryOneDAO = this.queryOneDAO.bind(this);
        this.createDAO = this.createDAO.bind(this);
    }
    async queryListDAOs(req, res) {
        try {
            const daos = await this.daoService.findAll();
            res.send({ 'daos': daos });
        }
        catch (error) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }
    async queryOneDAO(req, res) {
        try {
            const { daoId } = req.params;
            const dao = await this.daoService.findOne(daoId);
            if (dao === undefined)
                throw new NotFoundError_1.NotFoundError("DAO doesn't exist");
            res.send({ "dao": dao });
        }
        catch (error) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }
    async createDAO(req, res) {
        try {
            const dao = req.body.dao;
            await this.daoService.save(dao);
            res.send({});
        }
        catch (error) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }
}
exports.DAOController = DAOController;
