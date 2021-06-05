"use strict";
exports.__esModule = true;
exports.IEq = exports.Eq = void 0;
var IBool_1 = require("./IBool");
var Eq;
(function (Eq_1) {
    Eq_1.Ext = function (Eq) { return ({
        notEq: function (eq0) { return function (eq1) { return IBool_1.Bool.not(Eq.eq(eq0)(eq1)); }; }
    }); };
})(Eq || (Eq = {}));
exports.Eq = Eq;
exports.IEq = Eq;
exports["default"] = Eq;
