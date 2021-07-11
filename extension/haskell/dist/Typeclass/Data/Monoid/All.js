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
exports.All = exports.Show = void 0;
var All_1 = require("./All_");
var String_1 = require("../../../Instance/Data/String");
var Bool_1 = require("../../../Instance/Data/Bool");
var common_1 = require("../../../Common/common");
/** Show All */
var Show = ({
    show: function (_) { return (common_1.assign(Bool_1.Bool.fromI(_.value))(function (_) { return common_1.assign(String_1.String(_.tag)); })(function (_) { return String_1.String.Semigroup.append(String_1.String('All '))(_); })); },
});
exports.Show = Show;
var _All = (common_1.Json.assign(All_1.All, {
    Show: Show,
}));
exports.All = _All;
__exportStar(require("./All_"), exports);
exports.default = _All;
