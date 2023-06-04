"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTree = void 0;
const fund_1 = require("../../internal/models/fund");
const merkle_tree_1 = __importDefault(require("../../internal/utils/merkle-tree"));
async function getTree() {
    let data = await fund_1.LeafModel.find();
    let tree = merkle_tree_1.default.getPoseidonHashTree();
    for (let i = 0; i < data.length; i++) {
        tree.insert(data[i].commitment);
    }
    console.log(tree);
}
exports.getTree = getTree;
