"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const HttpError_1 = require("./HttpError");
class BadRequestError extends HttpError_1.HttpError {
    constructor(message) {
        super(400, message);
        this.name = 'BadRequestError';
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
exports.BadRequestError = BadRequestError;
