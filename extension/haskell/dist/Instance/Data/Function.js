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
exports.Function = exports.Category = exports.Semigroupoid = exports.identity = exports.compose = void 0;
var Function_1 = require("../../DataStructure/Data/Function");
var Common_1 = require("../../Common");
__exportStar(require("../../DataStructure/Data/Function"), exports);
/** compose :: Semigroupoid Function => Function b c -> Function a b -> Function a c */
var compose = (function (f0) { return function (f1) { return function (a) { return f0(f1(a)); }; }; });
exports.compose = compose;
/** identity :: Category Function => Function a a */
var identity = (function () { return function (a) { return a; }; });
exports.identity = identity;
var Semigroupoid = {
    URI: Function_1.URI,
    compose: compose,
};
exports.Semigroupoid = Semigroupoid;
var Category = __assign(__assign({}, Semigroupoid), { identity: function () { return function (a) { return a; }; } });
exports.Category = Category;
var _Function = (Common_1.Json.assign(Function_1.Function, {
    Semigroupoid: Semigroupoid,
    Category: Category,
    compose: compose,
    identity: identity,
}));
exports.Function = _Function;
exports.default = _Function;
