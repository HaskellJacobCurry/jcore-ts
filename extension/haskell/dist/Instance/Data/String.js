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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.String = exports.Monoid = exports.Semigroup = exports.Show = exports.mappend = exports.mempty = exports.append = exports.show = void 0;
var String_1 = require("../../DataStructure/Data/String");
var Show_1 = require("../../Typeclass/Data/Show");
var Semigroup_1 = require("../../Typeclass/Data/Semigroup");
var Monoid_1 = require("../../Typeclass/Data/Monoid");
var Common_1 = require("../../Common");
__exportStar(require("../../DataStructure/Data/String"), exports);
var show = (function (_) { return Show.show(_); });
exports.show = show;
var append = (function (_0) { return function (_1) { return Semigroup.append(_0)(_1); }; });
exports.append = append;
var mempty = (function () { return Monoid.mempty(); });
exports.mempty = mempty;
var mappend = (function (_0) { return function (_1) { return Monoid.mappend(_0)(_1); }; });
exports.mappend = mappend;
var Show = Show_1.IShow.instantiate({
    show: function (string) { return "\"" + string.toString() + "\""; },
});
exports.Show = Show;
var Semigroup = Semigroup_1.ISemigroup.instantiate({
    append: function (_0) { return function (_1) { return String_1.String("" + _0.value + _1.value); }; }
});
exports.Semigroup = Semigroup;
var Monoid = Monoid_1.IMonoid.instantiate(__assign(__assign({}, Semigroup), { mempty: function () { return String_1.String(''); } }));
exports.Monoid = Monoid;
var _String = (Common_1.Json.assign(String_1.String, {
    Show: Show,
    Semigroup: Semigroup,
    Monoid: Monoid,
    show: show,
    append: append,
    mempty: mempty,
    mappend: mappend,
}));
exports.String = _String;
exports.default = _String;
