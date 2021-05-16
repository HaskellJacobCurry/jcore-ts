"use strict";
exports.__esModule = true;
exports.Eff = exports.A = void 0;
var IMonoid_1 = require("../IMonoid");
var ts_toolbelt_1 = require("../../../ts-toolbelt");
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.append = function (_) { return _; };
    A.prototype.a = function () { };
    A.prototype.s = function () { return this; };
    return A;
}());
var _A = ((function (A) { return (ts_toolbelt_1.Json.assign(A, {
    mempty: function () { return new A; }
})); })(A));
exports.A = _A;
var Test = ((function (Test) { return (ts_toolbelt_1.Json.assign(Test, {
    mempty: function () { return new Test; }
})); })(/** @class */ (function () {
    function Test() {
    }
    Test.prototype.append = function (_) { return _; };
    Test.prototype.a = function () { };
    Test.prototype.s = function () { return this; };
    return Test;
}())));
Test.mempty().append(Test.mempty()).s().a();
var Eff = /** @class */ (function () {
    function Eff() {
        this.a = undefined;
    }
    Eff.prototype.append = function (aff) { return aff; };
    return Eff;
}());
var _Eff = function (a) { return ((function (Aff) { return ((function (_) { return ((function (_) { return (ts_toolbelt_1.Json.assign(Aff, _['Monoid'])); })({
    'Monoid': _['Monoid'][IMonoid_1.IMonoid.validate(a) ? 1 : 0]
})); })({
    'Monoid': {
        1: (function (a) { return ({
            mempty: function () { return Aff.Lift(a.mempty()); }
        }); })(a),
        0: {}
    }
})); })(ts_toolbelt_1.Json.assign(Eff, {
    Lift: function (a) { return ((function (aff) {
        if (aff === void 0) { aff = new Eff(); }
        return (aff.a = a, aff);
    })()); }
}))); };
exports.Eff = _Eff;
var Aff = ((function (Aff) { return function (a) { return ((function (Aff) { return ((function (Aff) { return ((function (_) { return ((function (_) { return (ts_toolbelt_1.Json.assign(Aff, _['Monoid'])); })({
    'Monoid': _['Monoid'][IMonoid_1.IMonoid.validate(a) ? 1 : 0]
})); })({
    'Monoid': {
        1: (function (a) { return ({
            mempty: function () { return Aff.Lift(a.mempty()); }
        }); })(a),
        0: {}
    }
})); })(ts_toolbelt_1.Json.assign(Aff, {
    Lift: function (a) { return ((function (aff) {
        if (aff === void 0) { aff = new Aff(); }
        return (aff.a = a, aff);
    })()); }
}))); })(Aff(a))); }; })(function (a) { return (/** @class */ (function () {
    function Aff() {
        this.a = new a();
    }
    Aff.prototype.append = function (aff) { return aff; };
    return Aff;
}())); }));
var S = /** @class */ (function () {
    function S() {
        this.s = [];
    }
    return S;
}());
var AffS = Aff(S);
var r = AffS.Lift(new S());
var t = Aff(Test).mempty().append(new (Aff(Test))());
var s = new (Aff(Test))();
