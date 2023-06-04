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
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const swaggerUi = __importStar(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const Router_1 = require("./api/routers/Router");
const env_1 = __importDefault(require("./lib/env"));
const logger_1 = __importDefault(require("./lib/logger"));
const db = __importStar(require("./database"));
class App {
    constructor() {
        this.initialize()
            .then(() => {
            this.app = this.createServer();
            this.configSwagger();
            this.startServer();
        }).catch(error => {
            logger_1.default.error('Server crashed: ' + error);
        });
    }
    async initialize() {
        logger_1.default.info('Initializing...');
        await this.connectDatabase('mongo');
    }
    async connectDatabase(database) {
        switch (database) {
            case db.DB.MONGODB:
                const MONGODB_URL = `mongodb://${env_1.default.db.username}:${env_1.default.db.password}@${env_1.default.db.host}:${env_1.default.db.port}/${env_1.default.db.database}`;
                try {
                    const dbConnection = new db.Mongo();
                    await dbConnection.init(MONGODB_URL, {});
                }
                catch (err) {
                    throw err;
                }
                break;
            case db.DB.LEVELDB:
                break;
            case db.DB.REDIS:
                break;
            default:
                throw ('Database not supported');
        }
    }
    async globalVars() { }
    async configSwagger() {
        if (env_1.default.swagger.enabled) {
            const options = {
                failOnErrors: true,
                definition: {
                    openapi: '3.0.0',
                    info: {
                        title: env_1.default.app.name,
                        description: env_1.default.app.description,
                        version: env_1.default.app.version
                    },
                    host: `${env_1.default.app.host}:${env_1.default.app.port}`,
                },
                apis: ['./src/api/routers/*.ts'],
                basePath: env_1.default.app.routePrefix
            };
            const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
            this.app.use(`${env_1.default.swagger.route}`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
            logger_1.default.info('Swagger UI is enabled');
        }
    }
    createServer() {
        const expressApp = (0, express_1.default)();
        expressApp.use(body_parser_1.default.json());
        expressApp.use(body_parser_1.default.urlencoded({ extended: true }));
        expressApp.use((0, compression_1.default)());
        expressApp.use((0, cors_1.default)());
        expressApp.use(env_1.default.app.routePrefix, new Router_1.Routers().router);
        return expressApp;
    }
    startServer() {
        if (!env_1.default.isTest) {
            this.app.listen(env_1.default.app.port, () => {
                logger_1.default.info('Server is running on port ' + env_1.default.app.port);
            });
        }
    }
}
exports.App = App;
const app = new App();
