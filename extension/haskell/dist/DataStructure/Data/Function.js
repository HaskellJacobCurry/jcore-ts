"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assign = exports.define = exports.on = exports.apply = exports.const_ = exports.flip = exports.create = exports.Function = exports.URI = void 0;
var common_1 = require("../../Common/common");
var URI = common_1.S('Function');
exports.URI = URI;
var createFunction = function (f) { return f; };
exports.create = createFunction;
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
var define = common_1.define;
exports.define = define;
var assign = common_1.assign;
exports.assign = assign;
var Function = (common_1.Json.assign(createFunction, {
    URI: URI,
    create: createFunction,
    flip: flip,
    const: const_,
    apply: apply,
    on: on,
    define: define,
    assign: assign,
}));
exports.Function = Function;
exports.default = Function;
