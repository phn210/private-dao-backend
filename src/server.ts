import {Scanner} from './internal/builder/scanner'
import { JobConfig } from './internal/models/config'
import * as db from './database';
import env from './lib/env';

const globleConfig: JobConfig = {
    Network: "sepolia",
    ChainID: 11155111,
    RPC: "https://rpc.sepolia.org",
    ConfirmedBlocks: 3,
    Mullticall: "0x0000000000000000000000000",
}

export class Service {
    public server!: Scanner

    constructor(cfg: JobConfig) {
        this.initialize() 
        .then(() => {
            this.server = new Scanner(cfg)
            this.server.Run(["tally"]).then().catch(err => {
                console.error(err)
            })
        }).catch(error => {
            console.error('Server crashed: ' + error)
        })
    }
    public async initialize() {
        await this.connectDatabase('mongo');
    }

    public async connectDatabase(database: string) {
        switch (database) {
            case db.DB.MONGODB:
                const MONGODB_URL = `mongodb://${env.db.username}:${env.db.password}@${env.db.host}:${env.db.port}/${env.db.database}`;
                console.log(MONGODB_URL)
                try {
                    const dbConnection = new db.Mongo()
                    await dbConnection.init(MONGODB_URL, {});
                } catch (err) {
                    throw err;
                }
                break;
        }

    }
}

const service = new Service(globleConfig)