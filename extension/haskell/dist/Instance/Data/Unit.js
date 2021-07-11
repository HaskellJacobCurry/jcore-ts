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
exports.Unit = exports.Show = void 0;
var Unit_1 = require("../../DataStructure/Data/Unit");
var String_1 = require("../../DataStructure/Data/String");
var Show_1 = require("../../Typeclass/Data/Show");
var Common_1 = require("../../Common");
__exportStar(require("../../DataStructure/Data/Unit"), exports);
var Show = Show_1.IShow.instantiate({
    show: function (_) { return String_1.String('Unit'); },
});
exports.Show = Show;
var _Unit = (Common_1.Json.assign(Unit_1.Unit, {
    Show: Show,
}));
exports.Unit = _Unit;
exports.default = _Unit;
