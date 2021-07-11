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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sum = exports.Show = void 0;
var Sum_1 = require("./Sum_");
var Show_1 = require("../Show");
var String_1 = require("../../../Instance/Data/String");
var common_1 = require("../../../Common/common");
/** Show a => Show (Sum a) */
var Show = function (_) { return ((function (ShowA) {
    if (ShowA === void 0) { ShowA = _; }
    return (Show_1.IShow.instantiate({
        show: function (sumA) { return (common_1.assign(String_1.String('Sum('))(function (_) { return common_1.assign(String_1.String.Semigroup.append(_)(String_1.String.fromI(ShowA.show(sumA.value)))); })(function (_) { return String_1.String.Semigroup.append(_)(String_1.String(')')); })); },
    }));
})()); };
exports.Show = Show;
var _Sum = (common_1.Json.assign(Sum_1.Sum, {
    Show: Show,
}));
exports.Sum = _Sum;
__exportStar(require("./Sum_"), exports);
exports.default = _Sum;
