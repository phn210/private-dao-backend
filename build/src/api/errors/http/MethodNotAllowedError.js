"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodNotAllowedError = void 0;
const HttpError_1 = require("./HttpError");
class MethodNotAllowedError extends HttpError_1.HttpError {
    constructor(message) {
        super(405, message);
        this.name = 'MethodNotAllowedError';
        Object.setPrototypeOf(this, MethodNotAllowedError.prototype);
    }
}
exports.MethodNotAllowedError = MethodNotAllowedError;
