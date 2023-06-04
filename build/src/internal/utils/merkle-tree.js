"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fixed_merkle_tree_1 = require("fixed-merkle-tree");
const poseideon_hash_1 = __importDefault(require("./poseideon-hash"));
const mimc_hash_1 = __importDefault(require("./mimc-hash"));
var Tree;
(function (Tree) {
    function getPoseidonHashTree() {
        const tree = new fixed_merkle_tree_1.MerkleTree(20, [], {
            hashFunction: poseideon_hash_1.default.hashLeftRight,
            zeroElement: "1117582952394327218264374806630104116016694857615943107127336590235748983513",
        });
        return tree;
    }
    Tree.getPoseidonHashTree = getPoseidonHashTree;
    function getMiMCHashTree() {
        const tree = new fixed_merkle_tree_1.MerkleTree(20, [], {
            hashFunction: mimc_hash_1.default.hashLeftRight,
            zeroElement: mimc_hash_1.default.hashLeftRight(0, 0),
        });
        return tree;
    }
    Tree.getMiMCHashTree = getMiMCHashTree;
    function getDefaultTree() {
        return new fixed_merkle_tree_1.MerkleTree(12);
    }
    Tree.getDefaultTree = getDefaultTree;
})(Tree || (Tree = {}));
exports.default = Tree;
