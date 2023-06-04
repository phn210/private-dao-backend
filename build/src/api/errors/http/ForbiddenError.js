"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
const HttpError_1 = require("./HttpError");
class ForbiddenError extends HttpError_1.HttpError {
    constructor(message) {
        super(403, message);
        this.name = 'ForbiddenError';
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}
exports.ForbiddenError = ForbiddenError;
