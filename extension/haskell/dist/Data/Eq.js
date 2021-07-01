"use strict";
exports.__esModule = true;
exports.IEq = exports.Eq = void 0;
var IBool_1 = require("./IBool");
var common_1 = require("../util/common");
var Eq;
(function (Eq_1) {
    Eq_1.Ext = function (Eq) { return ({
        notEq: function (eq0) { return function (eq1) { return IBool_1.IBool.not(Eq.eq(eq0)(eq1)); }; }
    }); };
    Eq_1.instantiate = function (_) { return (common_1.assign(_)(function (_) { return common_1.Json.assign(_, Eq_1.Ext(_)); })); };
})(Eq || (Eq = {}));
exports.Eq = Eq;
exports.IEq = Eq;
exports["default"] = Eq;
