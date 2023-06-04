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
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const pkg = __importStar(require("../../../package.json"));
const utils_1 = require("./utils");
/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({ path: path.join(process.cwd(), `.env${((process.env.NODE_ENV === 'test') ? '.test' : '')}`) });
/**
 * Environment variables
 */
const env = {
    node: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    app: {
        name: (0, utils_1.getOsEnv)('APP_NAME'),
        version: pkg.version,
        description: pkg.description,
        host: (0, utils_1.getOsEnv)('APP_HOST'),
        routePrefix: (0, utils_1.getOsEnv)('APP_ROUTE_PREFIX'),
        port: (0, utils_1.normalizePort)(process.env.PORT || (0, utils_1.getOsEnv)('APP_PORT')),
        // banner: toBool(getOsEnv('APP_BANNER')),
        dirs: {
            controllers: (0, utils_1.getOsPaths)('CONTROLLERS'),
            middlewares: (0, utils_1.getOsPaths)('MIDDLEWARES'),
            models: (0, utils_1.getOsPaths)('MODELS'),
        },
    },
    log: {
        level: (0, utils_1.getOsEnv)('LOG_LEVEL'),
        json: (0, utils_1.toBool)((0, utils_1.getOsEnvOptional)('LOG_JSON') ?? 'false'),
        output: (0, utils_1.getOsEnv)('LOG_OUTPUT'),
    },
    db: {
        host: (0, utils_1.getOsEnvOptional)('MONGODB_HOST') ?? 'localhost',
        port: (0, utils_1.toNumber)((0, utils_1.getOsEnvOptional)('MONGODB_PORT') ?? '27017'),
        database: (0, utils_1.getOsEnvOptional)('MONGODB_DATABASE') ?? 'ziden-test',
        username: (0, utils_1.getOsEnvOptional)('MONGODB_USERNAME'),
        password: (0, utils_1.getOsEnvOptional)('MONGODB_PASSWORD'),
    },
    swagger: {
        enabled: (0, utils_1.toBool)((0, utils_1.getOsEnv)('SWAGGER_ENABLED')),
        route: (0, utils_1.getOsEnv)('SWAGGER_ROUTE'),
        username: (0, utils_1.getOsEnv)('SWAGGER_USERNAME'),
        password: (0, utils_1.getOsEnv)('SWAGGER_PASSWORD'),
    }
};
exports.default = env;
