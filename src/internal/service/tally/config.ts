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
    FundTopic: "0x2b9760e8316bd48dbb4ed8659b3b6deda3c7460d13309d8df59a5b4a9692aa64",
    BlockRangeLimit: 3000,
    BatchSize: 50,
    ConfirmedBlock: 0,
}