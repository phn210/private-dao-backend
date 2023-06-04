"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonController = void 0;
const getTreeProofPath_1 = require("../services/getTreeProofPath");
class CommonController {
    constructor() {
        this.fetchMerkleTree = this.fetchMerkleTree.bind(this);
    }
    async fetchMerkleTree(req, res) {
        try {
            await (0, getTreeProofPath_1.getTree)();
            res.send({});
        }
        catch (error) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }
}
exports.CommonController = CommonController;
