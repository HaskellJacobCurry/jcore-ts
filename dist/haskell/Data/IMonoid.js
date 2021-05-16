"use strict";
exports.__esModule = true;
exports.IMonoid = void 0;
var ts_toolbelt_1 = require("../../ts-toolbelt");
var IMonoid;
(function (IMonoid) {
    IMonoid.validate = function (a) { return ts_toolbelt_1.Function.validate(a.mempty); };
})(IMonoid = exports.IMonoid || (exports.IMonoid = {}));
