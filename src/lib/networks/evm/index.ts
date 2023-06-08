import * as ethers from 'ethers';
import { ABIS } from './abis/index';
import { addressConfig } from './addresses/index';
import { CHAINS, CHAIN_IDS } from './chains';

export function useContract(contractName: string, address: string, providerUrl: string): ethers.Contract | undefined {
    if (ABIS[contractName] === undefined) return;
    return new ethers.Contract(
        address,
        ABIS[contractName]?.interface,
        new ethers.providers['JsonRpcProvider'](providerUrl)
    )
}

export function useFundManager(chainId: number, address: string = '', providerUrl: string = ''): ethers.Contract | undefined {
    if (!Object.values(CHAIN_IDS).includes(chainId)) return undefined;
    
    const ADDRESS = addressConfig[chainId]!.FundManager ?? address;
    const PROVIDER = CHAINS[chainId]!.rpcUrls[0] ?? providerUrl;

    return useContract('FundManager'.toLowerCase(), ADDRESS, PROVIDER);
}

export function useDAOManager(chainId: number, address: string = '', providerUrl: string = ''): ethers.Contract | undefined {
    if (!Object.values(CHAIN_IDS).includes(chainId)) return undefined;
    
    const ADDRESS = addressConfig[chainId]!.DAOManager ?? address;
    const PROVIDER = CHAINS[chainId]!.rpcUrls[0] ?? providerUrl;

    return useContract('DAOManager'.toLowerCase(), ADDRESS, PROVIDER);
}

export function useDAO(chainId: number, address: string = '', providerUrl: string = ''): ethers.Contract | undefined {
    if (!Object.values(CHAIN_IDS).includes(chainId)) return undefined;
    
    const ADDRESS = addressConfig[chainId]!.DAO ?? address;
    const PROVIDER = CHAINS[chainId]!.rpcUrls[0] ?? providerUrl;

    return useContract('DAO'.toLowerCase(), ADDRESS, PROVIDER);
}

export function useDKG(chainId: number, address: string = '', providerUrl: string = ''): ethers.Contract | undefined {
    if (!Object.values(CHAIN_IDS).includes(chainId)) return undefined;
    
    const ADDRESS = addressConfig[chainId]!.DKG ?? address;
    const PROVIDER = CHAINS[chainId]!.rpcUrls[0] ?? providerUrl;

    return useContract('DKG'.toLowerCase(), ADDRESS, PROVIDER);
}


export {
    ABIS,
    addressConfig,
    CHAINS, CHAIN_IDS
}
// export { ABIS } from './abis/index.js';
// export { addressConfig } from './addresses/index.js';
// export { CHAINS, CHAIN_IDS } from './chains.js';