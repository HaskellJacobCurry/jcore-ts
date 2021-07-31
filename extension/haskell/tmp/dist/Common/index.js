"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.chain = exports.merge = void 0;
var Common_1 = require("../../../dist/Common");
__exportStar(require("../../../dist/Common"), exports);
var merge = Common_1.Json.assign;
exports.merge = merge;
var chain = (function (_) { return function (f) { return f(chain)(_); }; });
exports.chain = chain;
