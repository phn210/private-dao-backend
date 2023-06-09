type BasicChainInformation = {
    name: string;
    blockExplorerUrls?: string[];
    rpcUrls: string[];
    isTestnet?: boolean;
}

const CHAIN_IDS = {
    ETH_MAINNET: 1,
    GOERLI: 5,
    SEPOLIA: 11155111,
};

const CHAINS: { [chainId: number]: BasicChainInformation } = {
    [CHAIN_IDS.ETH_MAINNET]: {
        name: 'ETH Mainnet',
        blockExplorerUrls: ['https://etherscan.io'],
        rpcUrls: [
            process.env.INFURA_KEY ? `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}` : '',
            'https://cloudflare-eth.com',
        ].filter((url) => url !== '')
    },
    [CHAIN_IDS.GOERLI]: {
        name: "ETH Testnet Göerli",
        blockExplorerUrls: ['https://goerli.etherscan.io'],
        rpcUrls: [
            "https://rpc.goerli.mudit.blog/",
            "https://rpc.slock.it/goerli",
            "https://goerli.prylabs.net/"
        ],
        isTestnet: true
    },
    [CHAIN_IDS.SEPOLIA]: {
        name: "ETH Testnet Sepolia",
        blockExplorerUrls: ['https://sepolia.etherscan.io'],
        rpcUrls: [
            "https://rpc2.sepolia.org",
            "https://rpc.sepolia.org",
            "https://eth-sepolia.public.blastapi.io"
        ],
        isTestnet: true
    },
};

export { CHAINS, CHAIN_IDS };