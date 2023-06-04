"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeafModel = exports.FundModel = exports.FundDepositSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const FundDepositSchema = new mongoose_1.Schema({
    chainID: { type: Number, required: true },
    block: { type: Number, required: true },
    logIndex: { type: Number, required: true },
    txID: { type: String, required: true },
    timestamp: { type: Number, required: true },
    commitment: { type: String, required: true },
    leafIndex: { type: Number, required: false },
    tally: { type: Boolean, required: false },
});
exports.FundDepositSchema = FundDepositSchema;
const LeafInsertedSchema = new mongoose_1.Schema({
    id: { type: Number },
    chainID: { type: Number, required: true },
    block: { type: Number, required: true },
    logIndex: { type: Number, required: true },
    txID: { type: String, required: true },
    timestamp: { type: Number, required: true },
    commitment: { type: String, required: true },
});
LeafInsertedSchema.pre('save', function (next) {
    this.id += 1;
    next();
});
const FundModel = mongoose_1.default.model('Fund', FundDepositSchema);
exports.FundModel = FundModel;
const LeafModel = mongoose_1.default.model('Leaf', LeafInsertedSchema);
exports.LeafModel = LeafModel;
