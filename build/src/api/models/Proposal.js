"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProposalSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    daoId: { type: String, required: true },
    proposalId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
}, {
    strict: true,
    strictQuery: false,
    timestamps: true
});
exports.default = (0, mongoose_1.model)('Proposal', ProposalSchema);
