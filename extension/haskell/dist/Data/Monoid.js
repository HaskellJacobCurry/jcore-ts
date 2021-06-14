"use strict";
exports.__esModule = true;
exports.IMonoid = exports.Monoid = void 0;
var common_1 = require("../util/common");
var Monoid;
(function (Monoid_1) {
    Monoid_1.Ext = (function (Monoid) { return (common_1.define(function (Ext) { return ({
        mappend: Monoid.append
    }); })); });
})(Monoid || (Monoid = {}));
exports.Monoid = Monoid;
exports.IMonoid = Monoid;
exports["default"] = Monoid;
