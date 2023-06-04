import { ethers, providers } from "ethers";
import { configs, config } from "./config"
import { getAbis } from "../../utils/abi"
import { Job, secPerDay } from "../../models/common";
import { delay } from "../../utils/delay";
import { FundDeposit, FundDepositSchema, FundModel } from '../../models/fund'
import { JobConfig } from "../../models/config";

interface LogData {
    fundEvent: FundDeposit[];
    syncingBlock: number;
}

export class FundJob extends Job {
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
        if (data.fundEvent.length > 0) {
            await this.save(data.fundEvent)

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
                fundEvent: [],
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
        let fundEvents: FundDeposit[] = []

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
                fundEvents.push({
                    chainID: this.globalcfg.ChainID,
                    block: log.blockNumber,
                    logIndex: log.logIndex,
                    txID: log.transactionHash,
                    commitment: log.topics[2],
                    timestamp: blockInfo.timestamp,
                    leafIndex: -1,
                    tally: false,

                })
            }
            if (toBlock >= confirmedBlock) {
                return {
                    fundEvent: fundEvents,
                    syncingBlock: toBlock
                }
            }

            if (fundEvents.length >= this.localConfig.BatchSize) {
                return {
                    fundEvent: fundEvents,
                    syncingBlock: fundEvents[fundEvents.length - 1].block
                }
            }
        }
    }

    private async save(fundDeposits: FundDeposit[]) {
        await FundModel.insertMany(fundDeposits);
    }
}