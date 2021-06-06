"use strict";
exports.__esModule = true;
exports.Apply2_ = exports.Apply2 = exports.Apply1 = void 0;
var ts_toolbelt_1 = require("../../dependency/jcore/dist/ts-toolbelt");
var Apply1;
(function (Apply1) {
    Apply1.Ext = function (Apply) { return (ts_toolbelt_1.Function.define(function (Ext) { return ({
        lift2: function (f) { return function (applyA) { return function (applyB) { return (ts_toolbelt_1.Function.assign(ts_toolbelt_1.Function.assign(Apply.map(f)(applyA))(function (_) { return Apply.ap(_)(applyB); }))(function (_) { return ts_toolbelt_1.cast(_)(); })); }; }; }
    }); })); };
})(Apply1 || (Apply1 = {}));
exports.Apply1 = Apply1;
var Apply2;
(function (Apply2) {
    Apply2.Ext = function (Apply) { return (ts_toolbelt_1.Function.define(function (Ext) { return ({
        lift2: function (f) { return function (applyA) { return function (applyB) { return (ts_toolbelt_1.Function.assign(ts_toolbelt_1.Function.assign(Apply.map(f)(applyA))(function (_) { return Apply.ap(_)(applyB); }))(function (_) { return ts_toolbelt_1.cast(_)(); })); }; }; }
    }); })); };
})(Apply2 || (Apply2 = {}));
exports.Apply2 = Apply2;
var Apply2_;
(function (Apply2_) {
    Apply2_.Ext = function (Apply) { return (ts_toolbelt_1.Function.define(function (Ext) { return ({
        lift2: function (f) { return function (applyA) { return function (applyB) { return (ts_toolbelt_1.Function.assign(ts_toolbelt_1.Function.assign(Apply.map(f)(applyA))(function (_) { return Apply.ap(_)(applyB); }))(function (_) { return ts_toolbelt_1.cast(_)(); })); }; }; }
    }); })); };
})(Apply2_ || (Apply2_ = {}));
exports.Apply2_ = Apply2_;
