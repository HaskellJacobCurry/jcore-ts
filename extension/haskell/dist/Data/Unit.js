"use strict";
exports.__esModule = true;
exports.Show = exports.fromI = exports.Unit = void 0;
var Show_1 = require("./Show");
var String_1 = require("./String");
var common_1 = require("../util/common");
var fromI = (function (unit) { return common_1.cast(unit)(); });
exports.fromI = fromI;
var Show = Show_1.IShow.instantiate({
    show: function (_) { return String_1.String('Unit'); }
});
exports.Show = Show;
var Unit = common_1.Json.assign(function () { return ({}); }, {
    fromI: fromI,
    Show: Show
});
exports.Unit = Unit;
exports["default"] = Unit;
