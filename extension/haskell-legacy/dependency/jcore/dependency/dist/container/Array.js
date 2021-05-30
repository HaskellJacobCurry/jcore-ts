"use strict";
exports.__esModule = true;
exports.Array = void 0;
var Array = /** @class */ (function () {
    function Array(_) {
        if (_ === void 0) { _ = []; }
        this._ = _;
    }
    Array.prototype.unlift = function () { return this._; };
    Array.unlift = function (ins) { return ins.unlift(); };
    Array.prototype.size = function () { return this._.length; };
    Array.size = function (ins) { return ins.size(); };
    Array.prototype.at = function (i) {
        if (!(i < 0) && i < this._.length) {
            return this._[i];
        }
        throw new Error('Array.prototype.at');
    };
    Array.at = function (i, ins) { return ins.at(i); };
    Array.prototype._at = function (i) {
        return this._[i];
    };
    Array._at = function (i, ins) { return ins._at(i); };
    Array.prototype.foldl = function (reducer, seed) {
        var acc = seed;
        for (var i = 0, iEnd = this._.length; i != iEnd; i++) {
            acc = reducer(acc, this._[i]);
        }
        return acc;
    };
    Array.foldl = function (reducer, seed, ins) { return ins.foldl(reducer, seed); };
    Array.prototype.foldr = function (reducer, seed) {
        var acc = seed;
        for (var i = this._.length - 1; !(i < 0); i--) {
            acc = reducer(this._[i], acc);
        }
        return acc;
    };
    Array.foldr = function (reducer, seed, ins) { return ins.foldr(reducer, seed); };
    Array.prototype.push = function (vs) {
        this._.push.apply(this._, vs);
        return this;
    };
    Array.push = function (vs, ins) { return ins.push(vs); };
    Array.prototype.push_ = function (v) {
        this._[this._.length] = v;
        return this;
    };
    Array.push_ = function (v, ins) { return ins.push_(v); };
    Array.prototype.pop = function () {
        if (this._.length != 0) {
            return (this._.pop());
        }
        throw new Error('Array.prototype.pop');
    };
    Array.pop = function (ins) { return ins.pop(); };
    Array.prototype.fmap = function (f) {
        var _this = this;
        var i = 0;
        return this.foldl(function (acc, v) {
            _this._[i++] = f(v);
            return acc;
        }, this);
    };
    Array.fmap = function (f, ins) { return ins.fmap(f); };
    Array.prototype.map = function (f) {
        var _this = this;
        var i = 0;
        return this.foldl(function (acc, v) {
            _this._[i] = f(v, i);
            i += 1;
            return acc;
        }, this);
    };
    Array.map = function (f, ins) { return ins.map(f); };
    Array.prototype.forEach = function (f) {
        for (var i = 0, iEnd = this._.length; i < iEnd; i++) {
            f(this._[i], i);
        }
        return this;
    };
    Array.forEach = function (f, ins) { return ins.forEach(f); };
    Array.prototype.filter = function (pred) {
        var i = 0;
        return this.foldl(function (acc, v) { return pred(v, i++) ? acc.push([v]) : acc; }, new Array());
    };
    Array.filter = function (pred, ins) { return ins.filter(pred); };
    Array.prototype.some = function (pred) {
        for (var i = 0, iEnd = this._.length; i < iEnd; i++) {
            if (pred(this._[i], i)) {
                return true;
            }
        }
        return false;
    };
    Array.some = function (pred, ins) { return ins.some(pred); };
    Array.prototype.every = function (pred) {
        for (var i = 0, iEnd = this._.length; i < iEnd; i++) {
            if (!pred(this._[i], i)) {
                return false;
            }
        }
        return true;
    };
    Array.every = function (pred, ins) { return ins.every(pred); };
    Array.prototype.clone = function () {
        return this.foldl(function (acc, v) { return acc.push([v]); }, new Array());
    };
    Array.clone = function (ins) { return ins.clone(); };
    Array.prototype.reverse = function () {
        return this.foldr(function (v, acc) { return acc.push([v]); }, new Array());
    };
    Array.reverse = function (ins) { return ins.reverse(); };
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
    return Array;
}());
exports.Array = Array;
exports["default"] = Array;
