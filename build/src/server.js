"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const scanner_1 = require("./internal/builder/scanner");
const db = __importStar(require("./database"));
const env_1 = __importDefault(require("./lib/env"));
const globleConfig = {
    Network: "ethereum",
    ChainID: 1,
    RPC: "https://rpc.tenderly.co/fork/3e258fc0-0c6e-442c-aabb-be3bc939d8d3",
    ConfirmedBlocks: 1,
    Mullticall: "0x0000000000000000000000000",
};
class Service {
    constructor(cfg) {
        this.initialize()
            .then(() => {
            this.server = new scanner_1.Scanner(cfg);
            this.server.Run(["tally"]).then().catch(err => {
                console.error(err);
            });
        }).catch(error => {
            console.error('Server crashed: ' + error);
        });
    }
    async initialize() {
        await this.connectDatabase('mongo');
    }
    async connectDatabase(database) {
        switch (database) {
            case db.DB.MONGODB:
                const MONGODB_URL = `mongodb://${env_1.default.db.username}:${env_1.default.db.password}@${env_1.default.db.host}:${env_1.default.db.port}/${env_1.default.db.database}`;
                console.log(MONGODB_URL);
                try {
                    const dbConnection = new db.Mongo();
                    await dbConnection.init(MONGODB_URL, {});
                }
                catch (err) {
                    throw err;
                }
                break;
        }
    }
}
exports.Service = Service;
const service = new Service(globleConfig);
