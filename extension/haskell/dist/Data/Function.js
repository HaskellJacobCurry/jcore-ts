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
exports.id = exports.Category = exports.Semigroupoid = exports.assign = exports.define = exports.on = exports.apply = exports.const_ = exports.flip = exports.Function = exports.URI = void 0;
var common_1 = require("../util/common");
var URI = common_1.S('Function');
exports.URI = URI;
/** flip :: (a -> b -> c) -> b -> a -> c */
var flip = (function (f) { return function (b) { return function (a) { return f(a)(b); }; }; });
exports.flip = flip;
/** const :: a -> b -> a */
var const_ = (function (a) { return function (_) { return a; }; });
exports.const_ = const_;
/**
 * apply :: (a -> b) -> a -> b
 * alias :: [($)]
 */
var apply = (function (f) { return function (a) { return f(a); }; });
exports.apply = apply;
/** on :: (b -> b -> c) -> (a -> b) -> a -> a -> c */
var on = (function (f) { return function (g) { return function (a0) { return function (a1) { return f(g(a0))(g(a1)); }; }; }; });
exports.on = on;
var define = common_1.Function.define;
exports.define = define;
var assign = common_1.Function.assign;
exports.assign = assign;
/** compose :: Semigroupoid Function => Function b c -> Function a b -> Function a c */
var Semigroupoid = {
    URI: URI,
    compose: function (f0) { return function (f1) { return function (a) { return f0(f1(a)); }; }; }
};
exports.Semigroupoid = Semigroupoid;
/** identity :: Category Function => Function a a */
var Category = __assign(__assign({}, Semigroupoid), { identity: function () { return function (a) { return a; }; } });
exports.Category = Category;
var id = Category.identity;
exports.id = id;
var Function = {
    URI: URI,
    flip: flip,
    "const": const_,
    apply: apply,
    on: on,
    define: define,
    assign: assign,
    id: id,
    Semigroupoid: Semigroupoid,
    Category: Category
};
exports.Function = Function;
