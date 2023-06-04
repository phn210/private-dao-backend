import { ethers, providers } from "ethers";
import { configs, config } from "./config"
import { getAbis } from "../../utils/abi"
import { Job, secPerDay } from "../../models/common";
import { delay } from "../../utils/delay";
import { FundDeposit, FundDepositSchema, FundModel, LeafInserted, LeafModel } from '../../models/fund'
import { JobConfig } from "../../models/config";

interface LogData {
    leafEvent: LeafInserted[];
    syncingBlock: number;
}

export class TallyJob extends Job {
    private globalcfg: JobConfig;
    private localConfig: config;
    private abi: ethers.utils.Interface;
    private syncedBlock: number

    constructor(cfg: JobConfig) {
        super();
        this.globalcfg = cfg;
        this.localConfig = configs;
        this.abi = getAbis('src/internal/abis/funding.json');
        this.syncedBlock = 0;
    }

    public async run() {
        while (true) {
            console.log("Start");
            await this.process();
            console.log("Done");
            delay(3000);
        }
    }

    private async process() {
        var syncingBlock = this.syncedBlock
        let data: LogData = await this.getLogs(syncingBlock)
        if (data.leafEvent.length > 0) {
            await this.save(data.leafEvent)

        }
        this.syncedBlock = data.syncingBlock + 1;
    }

    private async getLogs(syncingBlock: number): Promise<LogData> {
        if (this.localConfig.StartBlock > syncingBlock) {
            syncingBlock = this.localConfig.StartBlock;
        }

        let provider: ethers.providers.Provider = new ethers.providers.JsonRpcProvider(this.globalcfg.RPC)
        let fundManager = new ethers.Contract(this.localConfig.Routers[0], this.abi, provider)

        let currBlock = await provider.getBlockNumber();
        let confirmedBlock = currBlock - this.globalcfg.ConfirmedBlocks;

        if (syncingBlock > confirmedBlock) {
            console.log(`wait next blocks, syncing: ${syncingBlock}, current: ${currBlock}, confirmed: ${confirmedBlock}`)
            return {
                leafEvent: [],
                syncingBlock: confirmedBlock
            }
        }

        const filter = {
            address: this.localConfig.Routers[0],
            topics: [
                this.localConfig.FundTopic
            ],
        }

        let toBlock: number;
        let skip = 0;
        let leafEvents: LeafInserted[] = []

        while (true) {
            let fromBlock = syncingBlock + skip;
            toBlock = syncingBlock + skip + this.localConfig.BlockRangeLimit - 1
            if (toBlock > confirmedBlock) {
                toBlock = confirmedBlock;
            }
            skip += this.localConfig.BlockRangeLimit;

            console.log(`quering from block ${fromBlock} to ${toBlock}`)
            let logs = await fundManager.queryFilter(filter, fromBlock, toBlock);
            console.log("len(logs):", logs.length)

            for (const log of logs) {
                let blockInfo = await provider.getBlock(log.blockNumber)
                leafEvents.push({
                    chainID: this.globalcfg.ChainID,
                    block: log.blockNumber,
                    logIndex: log.logIndex,
                    txID: log.transactionHash,
                    commitment: log.topics[1],
                    timestamp: blockInfo.timestamp,
                })
            }
            if (toBlock >= confirmedBlock) {
                return {
                    leafEvent: leafEvents,
                    syncingBlock: toBlock
                }
            }

            if (leafEvents.length >= this.localConfig.BatchSize) {
                return {
                    leafEvent: leafEvents,
                    syncingBlock: leafEvents[leafEvents.length - 1].block
                }
            }
        }
    }

    private async save(leafInserteds: LeafInserted[]) {
        console.log(leafInserteds)
        await LeafModel.insertMany(leafInserteds);
    }
}