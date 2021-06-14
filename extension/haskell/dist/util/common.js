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
exports.define = exports.assign = exports.flip = exports.const_ = exports.id_ = exports.id = void 0;
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
exports.const_ = const_;
var flip = (function (f) { return function (b) { return function (a) { return f(a)(b); }; }; });
exports.flip = flip;
var assign = ts_toolbelt_1.Function.assign;
exports.assign = assign;
var define = ts_toolbelt_1.Function.define;
exports.define = define;
