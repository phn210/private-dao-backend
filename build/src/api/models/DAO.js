"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DAOSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true },
    website: { type: String, required: true },
    contact: { type: String, required: true },
    tvr: { type: Number, required: true }
}, {
    strict: true,
    strictQuery: false,
    timestamps: true
});
exports.default = (0, mongoose_1.model)('DAO', DAOSchema);
