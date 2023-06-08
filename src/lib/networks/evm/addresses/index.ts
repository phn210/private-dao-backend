import { CHAIN_IDS } from '../chains';
import goerli from './goerli';
import sepolia from './sepolia';

export const addressConfig: {[chainId: number]: any} = {
    [CHAIN_IDS.GOERLI]: goerli,
    [CHAIN_IDS.SEPOLIA]: sepolia
}