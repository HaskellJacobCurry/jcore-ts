"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monoid = exports.Semigroup = exports.mempty = exports.append = exports.create = exports.get = exports.Sum = exports.URI = void 0;
var Semigroup_1 = require("../Semigroup");
var Monoid_1 = require("../Monoid");
var Common_1 = require("../../../Common");
var URI = Common_1.S('Sum');
exports.URI = URI;
var get = function (_) { return _.value; };
exports.get = get;
var createSum = (function (value) { return ({ URI: URI, value: value }); });
exports.create = createSum;
var append = (function (NumA) { return function (sum0) { return function (sum1) { return Sum(NumA.add(sum0.value)(sum1.value)); }; }; });
exports.append = append;
var mempty = (function (NumA) { return function () { return Sum(NumA.zero()); }; });
exports.mempty = mempty;
/** Num a => Semigroup (Sum a) */
var Semigroup = function (_) { return (Semigroup_1.ISemigroup.instantiate()(Common_1.create({
    append: append(_),
}))); };
exports.Semigroup = Semigroup;
/** Num a => Monoid (Sum a) */
var Monoid = function (_) { return (Monoid_1.IMonoid.instantiate()(Common_1.merge(Semigroup(_), Common_1.create({
    mempty: mempty(_),
})))); };
exports.Monoid = Monoid;
var Sum = (Common_1.Json.assign(createSum, {
    URI: URI,
    get: get,
    create: createSum,
    Semigroup: Semigroup,
    Monoid: Monoid,
    append: append,
    mempty: mempty,
}));
exports.Sum = Sum;
exports.default = Sum;
