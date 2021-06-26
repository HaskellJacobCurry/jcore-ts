"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Monoid = exports.Semigroup = exports.Show = exports.get = exports.Dual = exports.URI = void 0;
var Monoid_1 = require("../Monoid");
var String_1 = require("../String");
var common_1 = require("../../util/common");
var URI = common_1.S('Dual');
exports.URI = URI;
var get = function (_) { return _.value; };
exports.get = get;
/** Show a => Show (Dual a) */
var Show = (function (ShowA) { return ({
    show: function (dualA) { return (common_1.assign(String_1.String('Dual('))(function (_) { return common_1.assign(String_1.String.Semigroup.append(_)(String_1.String.fromI(ShowA.show(dualA.value)))); })(function (_) { return String_1.String.Semigroup.append(_)(String_1.String(')')); })); }
}); });
exports.Show = Show;
/** Semigroup a => Semigroup (Dual a) */
var Semigroup = (function (SemigroupA) { return ({
    append: function (dual0) { return function (dual1) { return Dual(SemigroupA.append(dual1.value)(dual0.value)); }; }
}); });
exports.Semigroup = Semigroup;
/** Monoid a => Monoid (Dual a) */
var Monoid = (function (MonoidA) { return (common_1.assign(__assign(__assign({}, Semigroup(MonoidA)), { mempty: function () { return Dual(MonoidA.mempty()); } }))(function (_) { return common_1.Json.assign(_, Monoid_1.IMonoid.Ext(_)); })); });
exports.Monoid = Monoid;
var Dual = common_1.Json.assign(function (value) { return ({ URI: URI, value: value }); }, {
    URI: URI,
    get: get,
    Show: Show,
    Semigroup: Semigroup,
    Monoid: Monoid
});
exports.Dual = Dual;
exports["default"] = Dual;