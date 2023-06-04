"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponseCode = exports.InformationalResponseCode = void 0;
var InformationalResponseCode;
(function (InformationalResponseCode) {
    InformationalResponseCode[InformationalResponseCode["CONTINUE"] = 100] = "CONTINUE";
    InformationalResponseCode[InformationalResponseCode["PROCESSING"] = 102] = "PROCESSING";
    InformationalResponseCode[InformationalResponseCode["EARLY_HINT"] = 103] = "EARLY_HINT";
})(InformationalResponseCode = exports.InformationalResponseCode || (exports.InformationalResponseCode = {}));
var SuccessResponseCode;
(function (SuccessResponseCode) {
    SuccessResponseCode[SuccessResponseCode["OK"] = 200] = "OK";
    SuccessResponseCode[SuccessResponseCode["CREATED"] = 201] = "CREATED";
    SuccessResponseCode[SuccessResponseCode["ACCEPTED"] = 202] = "ACCEPTED";
})(SuccessResponseCode = exports.SuccessResponseCode || (exports.SuccessResponseCode = {}));
