"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromI = exports.createUnit = exports.Unit = void 0;
var common_1 = require("../../Common/common");
var createUnit = (function () { return ({}); });
exports.createUnit = createUnit;
var fromI = (function (unit) { return common_1.cast(unit)(); });
exports.fromI = fromI;
var Unit = (common_1.Json.assign(createUnit, {
    create: createUnit,
    fromI: fromI,
}));
exports.Unit = Unit;
exports.default = Unit;
