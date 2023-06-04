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
    StartBlock: 17368900,
    JobIntervalSec: 6,
    Routers: ["0xb6C9f0CE324d7CF88E570CD1870796c6D85714dA"],
    FundTopic: "0x9a98994924b3f454e430a7e3c884aa145467ff2913f30a4b4c428a25797c7975",
    BlockRangeLimit: 3000,
    BatchSize: 50,
    ConfirmedBlock: 0,
}