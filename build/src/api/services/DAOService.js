"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAOService = void 0;
const DAO_1 = __importDefault(require("../models/DAO"));
class DAOService {
    constructor() { }
    async findOne(daoId) {
        return (await DAO_1.default.findById(daoId))?.toObject();
    }
    async findAll() {
        return (await DAO_1.default.find()).map(e => e.toObject());
    }
    async save(dao) {
        return (await DAO_1.default.findByIdAndUpdate(dao._id, dao, { upsert: true, new: true }));
    }
}
exports.DAOService = DAOService;
