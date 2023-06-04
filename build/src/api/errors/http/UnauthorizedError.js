"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const HttpError_1 = require("./HttpError");
class UnauthorizedError extends HttpError_1.HttpError {
    constructor(message) {
        super(401, message);
        this.name = 'UnauthorizedError';
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
exports.UnauthorizedError = UnauthorizedError;
