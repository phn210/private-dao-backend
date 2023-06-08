export type ABI = {
    address: string,
    interface: string[]
}

export const ABIS: {[key: string] : ABI} = {
    "round2contributionverifier": {
        "address": "",
        "interface": [
            "function getPublicInputsLength() pure returns (uint256)",
            "function verifyProof(uint256[2],uint256[2][2],uint256[2],uint256[]) view returns (bool)"
        ]
    },
    "fundingverifierdim3": {
        "address": "",
        "interface": [
            "function getPublicInputsLength() pure returns (uint256)",
            "function verifyProof(uint256[2],uint256[2][2],uint256[2],uint256[]) view returns (bool)"
        ]
    },
    "votingverifierdim3": {
        "address": "",
        "interface": [
            "function getPublicInputsLength() pure returns (uint256)",
            "function verifyProof(uint256[2],uint256[2][2],uint256[2],uint256[]) view returns (bool)"
        ]
    },
    "tallycontributionverifierdim3": {
        "address": "",
        "interface": [
            "function getPublicInputsLength() pure returns (uint256)",
            "function verifyProof(uint256[2],uint256[2][2],uint256[2],uint256[]) view returns (bool)"
        ]
    },
    "resultverifierdim3": {
        "address": "",
        "interface": [
            "function getPublicInputsLength() pure returns (uint256)",
            "function verifyProof(uint256[2],uint256[2][2],uint256[2],uint256[]) view returns (bool)"
        ]
    },
    "poseidonunit2": {
        "address": "",
        "interface": [
            "function poseidon(uint256[]) pure returns (uint256)"
        ]
    },
    "poseidon": {
        "address": "",
        "interface": [
            "constructor(address)",
            "function hash(uint256[2]) view returns (uint256)",
            "function poseidon2() view returns (address)"
        ]
    },
    "fundmanager": {
        "address": "",
        "interface": [
            "constructor(address[],address,uint256,tuple(uint32,address),tuple(uint64,uint64,uint64),tuple(address,address,address,address,address))",
            "event FundWithdrawed(uint256 indexed,address indexed,uint256 indexed)",
            "event Funded(uint256 indexed,address,uint256,uint256 indexed)",
            "event FundingRoundApplied(address indexed)",
            "event FundingRoundFailed(uint256 indexed)",
            "event FundingRoundFinalized(uint256 indexed)",
            "event FundingRoundLaunched(uint256 indexed,bytes32 indexed)",
            "event LeafInserted(uint256 indexed)",
            "event Refunded(uint256 indexed,address indexed,uint256 indexed)",
            "event TallyResultSubmitted(bytes32 indexed,uint256[] indexed)",
            "event TallyStarted(uint256 indexed,bytes32 indexed)",
            "function FIELD_SIZE() view returns (uint256)",
            "function ROOT_HISTORY_SIZE() view returns (uint32)",
            "function ZERO_VALUE() view returns (uint256)",
            "function applyForFunding(address)",
            "function bounty() view returns (uint256)",
            "function checkUpkeep(bytes) returns (bool, bytes)",
            "function config() view returns (uint64, uint64, uint64)",
            "function currentRootIndex() view returns (uint32)",
            "function daoManager() view returns (address)",
            "function dkgContract() view returns (address)",
            "function filledSubtrees(uint256) view returns (uint256)",
            "function finalizeFundingRound(uint256)",
            "function founder() view returns (address)",
            "function fund(uint256,uint256,uint256[][],uint256[][],bytes) payable",
            "function fundingRoundCounter() view returns (uint256)",
            "function fundingRoundInProgress() view returns (bool)",
            "function fundingRoundQueue() view returns (address)",
            "function fundingRounds(uint256) view returns (bytes32, uint256, uint64, uint64, uint64, uint64)",
            "function getDKGParams() view returns (uint8, uint8)",
            "function getDistributedKeyID(bytes32) view returns (uint256)",
            "function getFundingRoundBalance(uint256) view returns (uint256)",
            "function getFundingRoundQueueLength() view returns (uint256)",
            "function getFundingRoundState(uint256) view returns (uint8)",
            "function getLastRoot() view returns (uint256)",
            "function getListDAO(uint256) view returns (address[])",
            "function getRequestID(uint256,address,uint256) pure returns (bytes32)",
            "function hash(address,uint256,uint256) pure returns (uint256)",
            "function isCommittee(address) view returns (bool)",
            "function isFounder(address) view returns (bool)",
            "function isKnownRoot(uint256) view returns (bool)",
            "function launchFundingRound(uint256) returns (uint256, bytes32)",
            "function levels() view returns (uint32)",
            "function nextIndex() view returns (uint32)",
            "function numberOfCommittees() view returns (uint8)",
            "function performUpkeep(bytes)",
            "function poseidon() view returns (address)",
            "function refund(uint256)",
            "function requests(bytes32) view returns (uint256, uint256)",
            "function reserveFactor() view returns (uint256)",
            "function roots(uint256) view returns (uint256)",
            "function startTallying(uint256)",
            "function submitTallyResult(bytes32,uint256[])",
            "function threshold() view returns (uint8)",
            "function withdrawFund(uint256,address)",
            "function zeros(uint32) view returns (uint256)"
        ]
    },
    "daomanager": {
        "address": "",
        "interface": [
            "constructor()",
            "event DAOCreated(uint256,address)",
            "function REQUIRED_DEPOSIT() view returns (uint256)",
            "function admin() view returns (address)",
            "function applyForFunding()",
            "function applyForFundingDev(address)",
            "function createDAO(tuple(uint32,uint32,uint32,uint32,uint32)) payable returns (uint256)",
            "function daoCounter() view returns (uint256)",
            "function daos(uint256) view returns (address)",
            "function deposits(address) view returns (uint256)",
            "function distributedKeyId() view returns (uint256)",
            "function dkg() view returns (address)",
            "function fundManager() view returns (address)",
            "function setAdmin(address)",
            "function setDKG(address)",
            "function setDistributedKeyId(uint256)",
            "function setFundManager(address)"
        ]
    },
    "dkg": {
        "address": "",
        "interface": [
            "constructor(tuple(address,address,address,address,address))",
            "event DistributedKeyActivated(uint256 indexed)",
            "event DistributedKeyGenerated(uint256 indexed)",
            "event Round1DataSubmitted(address indexed)",
            "event Round2DataSubmitted(address indexed)",
            "event TallyContributionSubmitted(address indexed)",
            "event TallyResultSubmitted(address indexed,bytes32 indexed,uint256[] indexed)",
            "event TallyStarted(bytes32 indexed)",
            "function distributedKeyCounter() view returns (uint256)",
            "function distributedKeys(uint256) view returns (uint8, uint8, uint8, uint8, address, uint256, uint256, uint256)",
            "function fundingVerifiers(uint256) view returns (address)",
            "function generateDistributedKey(uint8,uint8) returns (uint256)",
            "function getCommitteeIndex(address,uint256) view returns (uint8)",
            "function getDimension(uint256) view returns (uint8)",
            "function getDistributedKeyState(uint256) view returns (uint8)",
            "function getM(bytes32) view returns (uint256[][])",
            "function getPublicKey(uint256) view returns (uint256, uint256)",
            "function getR(bytes32) view returns (uint256[][])",
            "function getRound1DataSubmissions(uint256) view returns (tuple(address,uint8,uint256[],uint256[])[])",
            "function getRound2DataSubmissions(uint256,uint8) view returns (tuple(uint8,uint256[])[])",
            "function getTallyDataSubmissions(bytes32) view returns (tuple(uint8,uint256[][])[])",
            "function getTallyTracker(bytes32) view returns (tuple(uint256,uint256[][],uint256[][],uint8,tuple(uint8,uint256[][])[],uint8,bool,address,address,address))",
            "function getTallyTrackerState(bytes32) view returns (uint8)",
            "function getType(uint256) view returns (uint8)",
            "function getUsageCounter(uint256) view returns (uint256)",
            "function getVerifier(uint256) view returns (address)",
            "function owner() view returns (address)",
            "function resultVerifiers(uint256) view returns (address)",
            "function round2Verifier() view returns (address)",
            "function startTallying(bytes32,uint256,uint256[][],uint256[][])",
            "function submitRound1Contribution(uint256,tuple(uint256[],uint256[])) returns (uint8)",
            "function submitRound2Contribution(uint256,tuple(uint8,uint8[],uint256[][],bytes))",
            "function submitTallyContribution(bytes32,tuple(uint8,uint256[][],bytes))",
            "function submitTallyResult(bytes32,uint256[],bytes)",
            "function tallyContributionVerifiers(uint256) view returns (address)",
            "function tallyTrackers(bytes32) view returns (uint256, uint8, uint8, bool, address, address, address)",
            "function votingVerifiers(uint256) view returns (address)"
        ]
    }
}