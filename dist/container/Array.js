"use strict";
exports.__esModule = true;
exports.Array = void 0;
var ts_toolbelt_1 = require("../ts-toolbelt");
var Array = /** @class */ (function () {
    function Array(_) {
        if (_ === void 0) { _ = []; }
        this._ = _;
    }
    Array.prototype.unlift = function () { return this._; };
    Array.prototype.size = function () { return this._.length; };
    Array.prototype.at = function (i) {
        if (!(i < 0) && i < this._.length) {
            return this._[i];
        }
        throw new Error('Array.prototype.at');
    };
    Array.prototype._at = function (i) {
        return this._[i];
    };
    Array.prototype.foldl = function (reducer, seed) {
        var acc = seed;
        for (var i = 0, iEnd = this._.length; i != iEnd; i++) {
            acc = reducer(acc, this._[i]);
        }
        return acc;
    };
    Array.prototype.foldr = function (reducer, seed) {
        var acc = seed;
        for (var i = this._.length - 1; !(i < 0); i--) {
            acc = reducer(this._[i], acc);
        }
        return acc;
    };
    Array.prototype.push = function (vs) {
        this._.push.apply(this._, vs);
        return this;
    };
    Array.prototype.push_ = function (v) {
        this._[this._.length] = v;
        return this;
    };
    Array.prototype.pop = function () {
        if (this._.length != 0) {
            return (this._.pop());
        }
        throw new Error('Array.prototype.pop');
    };
    Array.prototype.fmap = function (f) {
        var _this = this;
        var i = 0;
        return this.foldl(function (acc, v) {
            _this._[i++] = f(v);
            return acc;
        }, this);
    };
    Array.prototype.map = function (f) {
        var _this = this;
        var i = 0;
        return this.foldl(function (acc, v) {
            _this._[i] = f(v, i);
            i += 1;
            return acc;
        }, this);
    };
    Array.prototype.forEach = function (f) {
        for (var i = 0, iEnd = this._.length; i < iEnd; i++) {
            f(this._[i], i);
        }
        return this;
    };
    Array.prototype.filter = function (pred) {
        var i = 0;
        return this.foldl(function (acc, v) { return pred(v, i++) ? acc.push([v]) : acc; }, new Array());
    };
    Array.prototype.some = function (pred) {
        for (var i = 0, iEnd = this._.length; i < iEnd; i++) {
            if (pred(this._[i], i)) {
                return true;
            }
        }
        return false;
    };
    Array.prototype.every = function (pred) {
        for (var i = 0, iEnd = this._.length; i < iEnd; i++) {
            if (!pred(this._[i], i)) {
                return false;
            }
        }
        return true;
    };
    Array.prototype.clone = function () {
        return this.foldl(function (acc, v) { return acc.push([v]); }, new Array());
    };
    Array.prototype.reverse = function () {
        return this.foldr(function (v, acc) { return acc.push([v]); }, new Array());
    };
    Array.prototype.slice = function (iBegin, iEnd) {
        if (iBegin === void 0) { iBegin = 0; }
        if (iEnd === void 0) { iEnd = this.size(); }
        if (iBegin < 0 || !(iBegin < iEnd) || this._.length < iEnd) {
            throw new Error('Array.prototype.slice');
        }
        return this._slice(iBegin, iEnd);
    };
    Array.prototype._slice = function (iBegin, iEnd) {
        var sliced = new Array();
        while (iBegin < iEnd) {
            sliced.push_(this._at(iBegin++));
        }
        return sliced;
    };
    Array.prototype.begin = function () {
        return this.mutableIterator(0);
    };
    Array.prototype.end = function () {
        return this.mutableIterator(this._.length);
    };
    Array.prototype.cbegin = function () {
        return this.constantIterator(0);
    };
    Array.prototype.cend = function () {
        return this.constantIterator(this._.length);
    };
    Array.prototype.constantIterator = function (i) {
        return ts_toolbelt_1.Function.define(this.iteratorGenerator())(i);
    };
    Array.prototype.mutableIterator = function (i) {
        var _this = this;
        return ts_toolbelt_1.Function.define(function (rec) { return function (i) { return (ts_toolbelt_1.Json.assign(_this.iteratorGenerator()(rec)(i), {
            write: function (value) { return (_this._[i] = value, rec()(i)); }
        })); }; })(i);
    };
    Array.prototype.iteratorGenerator = function () {
        var _this = this;
        return function (rec) { return function (i) { return ({
            read: function () { return _this._[i]; },
            next: function () { return rec()(i + 1); },
            distance: function (to) { return to.index() - rec()(i).index(); },
            index: function () { return i; },
            clone: function () { return rec()(i); },
            equal: function (other) { return rec()(i).index() == other.index(); },
            prev: function () { return rec()(i - 1); },
            advance: function (step) { return rec()(i + step); }
        }); }; };
    };
    return Array;
}());
exports.Array = Array;
exports["default"] = Array;
