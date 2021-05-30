"use strict";
exports.__esModule = true;
exports.Semiring = void 0;
var ts_toolbelt_1 = require("../../dependency/jcore/dist/ts-toolbelt");
var Semiring;
(function (Semiring) {
    Semiring.add = function (semiring0) { return function (semiring1) { return ts_toolbelt_1.polymorph(semiring0.add(semiring1)); }; };
    Semiring.zero = function (construct) { return function () { return construct.zero(); }; };
    Semiring.mul = function (semiring0) { return function (semiring1) { return ts_toolbelt_1.polymorph(semiring0.mul(semiring1)); }; };
    Semiring.one = function (construct) { return function () { return construct.one(); }; };
})(Semiring || (Semiring = {}));
exports.Semiring = Semiring;
