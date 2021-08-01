"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monoid = exports.Semigroup = exports.mempty = exports.append = exports.create = exports.get = exports.All = exports.URI = void 0;
var Semigroup_1 = require("../Semigroup");
var Monoid_1 = require("../Monoid");
var IBool_1 = require("../IBool");
var common_1 = require("../../../Common/common");
var URI = common_1.S('All');
exports.URI = URI;
var get = function (_) { return _.value; };
exports.get = get;
var createAll = (function (value) { return ({ URI: URI, value: value }); });
exports.create = createAll;
var append = (function (_0) { return function (_1) { return createAll(IBool_1.IBool.and(_0.value)(_1.value)); }; });
exports.append = append;
var mempty = (function () { return createAll(IBool_1.IBool.True); });
exports.mempty = mempty;
/** Semigroup All */
var Semigroup = Semigroup_1.ISemigroup.instantiate()(common_1.create({
    append: append,
}));
exports.Semigroup = Semigroup;
/** Monoid All */
var Monoid = Monoid_1.IMonoid.instantiate()(common_1.merge(Semigroup, common_1.create({
    mempty: mempty,
})));
exports.Monoid = Monoid;
var All = (common_1.Json.assign(createAll, {
    URI: URI,
    get: get,
    create: createAll,
    Semigroup: Semigroup,
    Monoid: Monoid,
    append: append,
    mempty: mempty,
}));
exports.All = All;
exports.default = All;
