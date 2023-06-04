"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scanner = void 0;
const scanner_1 = require("../service/fund/scanner");
const scanner_2 = require("../service/tally/scanner");
class Scanner {
    constructor(cfg) {
        this.cfg = cfg;
        this.jobs = new Map([
            ["fund", new scanner_1.FundJob(cfg)],
            ["tally", new scanner_2.TallyJob(cfg)]
        ]);
    }
    async Run(service) {
        service.map(async (value, index) => {
            const job = this.jobs.get(value);
            if (job == undefined) {
                console.log("Not support job");
            }
            else {
                await job.run();
            }
        });
    }
}
exports.Scanner = Scanner;
