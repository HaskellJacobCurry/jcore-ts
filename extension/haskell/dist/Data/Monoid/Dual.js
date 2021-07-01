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
exports.Dual = exports.Show = void 0;
var Dual_1 = require("./Dual_");
var Show_1 = require("../Show");
var String_1 = require("../String");
var common_1 = require("../../util/common");
/** Show a => Show (Dual a) */
var Show = function (_) { return ((function (ShowA) {
    if (ShowA === void 0) { ShowA = _; }
    return (Show_1.IShow.instantiate({
        show: function (dualA) { return (common_1.assign(String_1.String('Dual('))(function (_) { return common_1.assign(String_1.String.Semigroup.append(_)(String_1.String.fromI(ShowA.show(dualA.value)))); })(function (_) { return String_1.String.Semigroup.append(_)(String_1.String(')')); })); }
    }));
})()); };
exports.Show = Show;
var _Dual = common_1.Json.assign(Dual_1.Dual, {
    Show: Show
});
exports.Dual = _Dual;
__exportStar(require("./Dual_"), exports);
exports["default"] = _Dual;
