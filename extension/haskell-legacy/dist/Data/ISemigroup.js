"use strict";
exports.__esModule = true;
exports.Semigroup = void 0;
var ts_toolbelt_1 = require("../../dependency/jcore/dist/ts-toolbelt");
var Semigroup;
(function (Semigroup) {
    Semigroup.append = function (semigroup0) { return function (semigroup1) { return ts_toolbelt_1.polymorph(semigroup0.append(semigroup1)); }; };
})(Semigroup || (Semigroup = {}));
exports.Semigroup = Semigroup;
