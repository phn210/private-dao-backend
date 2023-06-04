"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TallyJob = void 0;
const ethers_1 = require("ethers");
const config_1 = require("./config");
const abi_1 = require("../../utils/abi");
const common_1 = require("../../models/common");
const delay_1 = require("../../utils/delay");
const fund_1 = require("../../models/fund");
class TallyJob extends common_1.Job {
    constructor(cfg) {
        super();
        this.globalcfg = cfg;
        this.localConfig = config_1.configs;
        this.abi = (0, abi_1.getAbis)('src/internal/abis/funding.json');
        this.syncedBlock = 0;
    }
    async run() {
        while (true) {
            console.log("Start");
            await this.process();
            console.log("Done");
            (0, delay_1.delay)(3000);
        }
    }
    async process() {
        var syncingBlock = this.syncedBlock;
        let data = await this.getLogs(syncingBlock);
        if (data.leafEvent.length > 0) {
            await this.save(data.leafEvent);
        }
        this.syncedBlock = data.syncingBlock + 1;
    }
    async getLogs(syncingBlock) {
        if (this.localConfig.StartBlock > syncingBlock) {
            syncingBlock = this.localConfig.StartBlock;
        }
        let provider = new ethers_1.ethers.providers.JsonRpcProvider(this.globalcfg.RPC);
        let fundManager = new ethers_1.ethers.Contract(this.localConfig.Routers[0], this.abi, provider);
        let currBlock = await provider.getBlockNumber();
        let confirmedBlock = currBlock - this.globalcfg.ConfirmedBlocks;
        if (syncingBlock > confirmedBlock) {
            console.log(`wait next blocks, syncing: ${syncingBlock}, current: ${currBlock}, confirmed: ${confirmedBlock}`);
            return {
                leafEvent: [],
                syncingBlock: confirmedBlock
            };
        }
        const filter = {
            address: this.localConfig.Routers[0],
            topics: [
                this.localConfig.FundTopic
            ],
        };
        let toBlock;
        let skip = 0;
        let leafEvents = [];
        while (true) {
            let fromBlock = syncingBlock + skip;
            toBlock = syncingBlock + skip + this.localConfig.BlockRangeLimit - 1;
            if (toBlock > confirmedBlock) {
                toBlock = confirmedBlock;
            }
            skip += this.localConfig.BlockRangeLimit;
            console.log(`quering from block ${fromBlock} to ${toBlock}`);
            let logs = await fundManager.queryFilter(filter, fromBlock, toBlock);
            console.log("len(logs):", logs.length);
            for (const log of logs) {
                let blockInfo = await provider.getBlock(log.blockNumber);
                leafEvents.push({
                    chainID: this.globalcfg.ChainID,
                    block: log.blockNumber,
                    logIndex: log.logIndex,
                    txID: log.transactionHash,
                    commitment: log.topics[1],
                    timestamp: blockInfo.timestamp,
                });
            }
            if (toBlock >= confirmedBlock) {
                return {
                    leafEvent: leafEvents,
                    syncingBlock: toBlock
                };
            }
            if (leafEvents.length >= this.localConfig.BatchSize) {
                return {
                    leafEvent: leafEvents,
                    syncingBlock: leafEvents[leafEvents.length - 1].block
                };
            }
        }
    }
    async save(leafInserteds) {
        console.log(leafInserteds);
        await fund_1.LeafModel.insertMany(leafInserteds);
    }
}
exports.TallyJob = TallyJob;
