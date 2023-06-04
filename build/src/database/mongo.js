"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../lib/logger"));
class Mongo {
    constructor() { }
    async init(mongoUrl, options) {
        try {
            await mongoose_1.default.connect(mongoUrl, options);
            logger_1.default.info('Connected to ' + mongoUrl);
        }
        catch (err) {
            logger_1.default.error('Failed to connect to MongoDB');
            throw (err);
        }
    }
}
exports.Mongo = Mongo;
