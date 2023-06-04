"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const HttpError_1 = require("./HttpError");
class NotFoundError extends HttpError_1.HttpError {
    constructor(message) {
        super(404, message);
        this.name = 'NotFoundError';
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
exports.NotFoundError = NotFoundError;
