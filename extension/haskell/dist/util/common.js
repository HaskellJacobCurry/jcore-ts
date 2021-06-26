"use strict";
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
exports.__esModule = true;
exports.recurse = exports.create = exports.apply = exports.define = exports.assign = exports.flip = exports.const_ = exports["const"] = exports.id_ = exports.id = void 0;
__exportStar(require("../../dependency/jcore/dist/ts-toolbelt"), exports);
__exportStar(require("../../dependency/jcore/dist/ts-toolbelt/common"), exports);
__exportStar(require("../../dependency/jcore/dist/common/compose"), exports);
__exportStar(require("../../dependency/jcore/dist/common/pipe"), exports);
var ts_toolbelt_1 = require("../../dependency/jcore/dist/ts-toolbelt");
var id = function (a) { return a; };
exports.id = id;
var id_ = function () { return function (a) { return a; }; };
exports.id_ = id_;
var const_ = (function (a) { return function (_) { return a; }; });
exports["const"] = const_;
exports.const_ = const_;
var flip = (function (f) { return function (b) { return function (a) { return f(a)(b); }; }; });
exports.flip = flip;
var assign = (function (_) { return function (f) { return f(_); }; });
exports.assign = assign;
var define = ts_toolbelt_1.Function.define;
exports.define = define;
var apply = assign;
exports.apply = apply;
var create = function (_) { return _; };
exports.create = create;
/** recurse :: ((...a[i]) -> ((...a[i]) -> b) -> b) -> (...a[i]) -> b */
var recurse = (function () { return function (f) { return function () {
    var as = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        as[_i] = arguments[_i];
    }
    return (apply((function (x) { return x(x); })(create(function (x) { return function () {
        var as = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            as[_i] = arguments[_i];
        }
        return ((function (s) {
            if (s === void 0) { s = function () {
                var _ = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _[_i] = arguments[_i];
                }
                return x(x).apply(void 0, _);
            }; }
            return (f.apply(void 0, as)(s));
        })());
    }; })))(function (_) { return _.apply(void 0, as); }));
}; }; });
exports.recurse = recurse;
