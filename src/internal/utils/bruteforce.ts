import { computeAddress } from "ethers/lib/utils";
import BabyJub from "./babyjub";
import { Committee } from "./index";
import Utils from "./utils";
import bigInt, { BigInteger, BigNumber } from "big-integer";


export function bruteforce(balance: number, M: Array<Array<BigInt>>, D: Array<Array<BigInt[]>>, listIndex: number[]): Array<BigInt> | undefined {
    const vectorResult: Array<Array<BigInt>> = Committee.getResultVector(listIndex, D, M);
    let finalResult = new Array<BigInt>(M.length);
    for (let i = 0; i <= balance; i++) {
        let valueBigInteger = BabyJub.mulPointBaseScalar(Utils.getBigInteger(BigInt(i)));
        let value = Utils.getBigIntArray(valueBigInteger);
        for (let j = 0; j < vectorResult.length; j++) {
            if (compareVector(value, vectorResult[j])) {
                finalResult[j] = BigInt(i);
            }
        }
    }
    return finalResult
}

    function compareVector(a: Array<BigInt>, b: Array<BigInt>): boolean {
    if (a.length != b.length) {
        return false
    }

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

