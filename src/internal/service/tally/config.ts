export interface config {
    StartBlock: number
    JobIntervalSec: number,
    Routers: Array<string>,
    FundTopic: string,
    BlockRangeLimit: number,
    BatchSize: number,
    ConfirmedBlock: number
}

export var configs:config = {
    StartBlock: 3642910,
    JobIntervalSec: 1800,
    Routers: ["0xb4Dde6Dba767A281ef15bc4c64E8607ceC25420D"],
    FundTopic: "0x9a98994924b3f454e430a7e3c884aa145467ff2913f30a4b4c428a25797c7975",
    BlockRangeLimit: 3000,
    BatchSize: 50,
    ConfirmedBlock: 0,
}