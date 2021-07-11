"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMonoid = exports.Monoid = void 0;
var common_1 = require("../../Common/common");
var Monoid;
(function (Monoid_1) {
    Monoid_1.Ext = (function (Monoid) { return (common_1.define(function (Ext) { return ({
        mappend: Monoid.append,
    }); })); });
    Monoid_1.instantiate = (function (_) { return (common_1.assign(_)(function (_) { return common_1.Json.assign(_, Monoid_1.Ext(_)); })); });
})(Monoid || (Monoid = {}));
exports.Monoid = Monoid;
exports.IMonoid = Monoid;
exports.default = Monoid;
