"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bruteforce = void 0;
const babyjub_1 = __importDefault(require("./babyjub"));
const index_1 = require("./index");
const utils_1 = __importDefault(require("./utils"));
function bruteforce(balance, M, D, listIndex) {
    const vectorResult = index_1.Committee.getResultVector(listIndex, D, M);
    let finalResult = new Array(M.length);
    for (let i = 0; i <= balance; i++) {
        let valueBigInteger = babyjub_1.default.mulPointBaseScalar(utils_1.default.getBigInteger(BigInt(i)));
        let value = utils_1.default.getBigIntArray(valueBigInteger);
        for (let j = 0; j < vectorResult.length; j++) {
            if (compareVector(value, vectorResult[j])) {
                finalResult[j] = BigInt(i);
            }
        }
    }
    return finalResult;
}
exports.bruteforce = bruteforce;
function compareVector(a, b) {
    if (a.length != b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
