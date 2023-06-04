"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
const HttpError_1 = require("./HttpError");
class InternalServerError extends HttpError_1.HttpError {
    constructor(message) {
        super(500, message);
        this.name = 'InternalServerError';
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}
exports.InternalServerError = InternalServerError;
