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
exports.mappend = exports.mempty = exports.Monoid = exports.append = exports.Semigroup = exports.show = exports.Show = exports.create = exports.fromI = exports.String = exports.URI = void 0;
var Show_1 = require("./Show");
var Semigroup_1 = require("./Semigroup");
var Monoid_1 = require("./Monoid");
var common_1 = require("../util/common");
var URI = common_1.S('String');
exports.URI = URI;
var fromI = (function (string) { return common_1.cast(common_1.Json.assign(string, { URI: URI }))(); });
exports.fromI = fromI;
var create_ = function (value) { return ({
    URI: URI,
    value: value,
    toString: function () { return value; }
}); };
exports.create = create_;
var Show = Show_1.IShow.instantiate({
    show: function (string) { return "\"" + string.toString() + "\""; }
});
exports.Show = Show;
var show = Show.show;
exports.show = show;
var Semigroup = Semigroup_1.ISemigroup.instantiate({
    append: function (_0) { return function (_1) { return create_("" + _0.value + _1.value); }; }
});
exports.Semigroup = Semigroup;
var append = Semigroup.append;
exports.append = append;
var Monoid = Monoid_1.IMonoid.instantiate(__assign(__assign({}, Semigroup), { mempty: function () { return create_(''); } }));
exports.Monoid = Monoid;
var mempty = Monoid.mempty;
exports.mempty = mempty;
var mappend = Monoid.mappend;
exports.mappend = mappend;
var String = common_1.Json.assign(create_, {
    URI: URI,
    fromI: fromI,
    create: create_,
    show: show,
    append: append,
    mempty: mempty,
    mappend: mappend,
    Show: Show,
    Semigroup: Semigroup,
    Monoid: Monoid
});
exports.String = String;
exports["default"] = String;
