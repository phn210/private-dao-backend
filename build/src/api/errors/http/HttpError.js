"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
    constructor(httpCode, message) {
        super();
        Object.setPrototypeOf(this, HttpError.prototype);
        this.httpCode = httpCode;
        if (message)
            this.message = message;
        this.stack = new Error().stack;
    }
}
exports.HttpError = HttpError;
