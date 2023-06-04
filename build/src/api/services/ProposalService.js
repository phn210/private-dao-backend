"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalService = void 0;
const Proposal_1 = __importDefault(require("../models/Proposal"));
class ProposalService {
    constructor() { }
    async findOne(daoId, proposalId) {
        return (await Proposal_1.default.findById(`${daoId}-${proposalId}`))?.toObject();
    }
    async findByDAO(daoId) {
        return (await Proposal_1.default.find({ 'daoId': daoId })).map(e => e.toObject());
    }
    async save(proposal) {
        return (await Proposal_1.default.findByIdAndUpdate(proposal._id, proposal, { upsert: true, new: true }));
    }
}
exports.ProposalService = ProposalService;
