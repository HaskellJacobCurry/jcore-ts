"use strict";
exports.__esModule = true;
exports.Ring = void 0;
var ts_toolbelt_1 = require("../../ts-toolbelt");
var Ring;
(function (Ring) {
    Ring.sub = function (ring0) { return function (ring1) { return ts_toolbelt_1.polymorph(ring0.sub(ring1)); }; };
    Ring.negate = function (ring) { return ts_toolbelt_1.polymorph(ring.construct.zero().sub(ring)); };
})(Ring = exports.Ring || (exports.Ring = {}));
