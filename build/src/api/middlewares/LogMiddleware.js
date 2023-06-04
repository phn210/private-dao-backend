"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogMiddleware = void 0;
const morgan_1 = __importDefault(require("morgan"));
const env_1 = __importDefault(require("../../lib/env"));
const logger_1 = __importDefault(require("../../lib/logger"));
class LogMiddleware {
    use(req, res, next) {
        const myStream = {
            write: (text) => {
                logger_1.default.info(text);
            }
        };
        return (0, morgan_1.default)(env_1.default.log.output, {
            stream: myStream,
        })(req, res, next);
    }
}
exports.LogMiddleware = LogMiddleware;
