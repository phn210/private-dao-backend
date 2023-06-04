import { FundJob } from "../service/fund/scanner";
import { Job } from "../models/common";
import { JobConfig } from "../models/config";
import {delay} from '../utils/delay'
import { TallyJob } from "../service/tally/scanner";

export class Scanner {
    private cfg: JobConfig;
    private jobs: Map<string, Job>;

    constructor(cfg: JobConfig) {
        this.cfg = cfg;
        this.jobs = new Map<string, Job>([
            ["fund", new FundJob(cfg)],
            ["tally", new TallyJob(cfg)]
        ])
    }

    public async Run(service: Array<string>) {
        service.map(async (value, index) => {
            const job = this.jobs.get(value);
            if (job == undefined) {
                console.log("Not support job");
            } else {
                await job.run();
            }
        })
    }
}
