"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Array = void 0;
var Array_1 = require("./Array");
var curry_1 = require("../common/curry");
var Array_ = /** @class */ (function (_super) {
    __extends(Array_, _super);
    function Array_() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Array_.unlift = function (ins) {
        return ins.unlift();
    };
    Array_.size = function (ins) {
        return ins.size();
    };
    Array_.at = function () {
        return curry_1.curry(function (i, ins) { return ins.at(i); });
    };
    Array_._at = function () {
        return curry_1.curry(function (i, ins) { return ins._at(i); });
    };
    Array_.foldl = function () {
        return curry_1.curry(function (reducer, seed, ins) { return ins.foldl(reducer, seed); });
    };
    Array_.foldr = function () {
        return curry_1.curry(function (reducer, seed, ins) { return ins.foldr(reducer, seed); });
    };
    Array_.push = function () {
        return curry_1.curry(function (vs, ins) { return ins.push(vs); });
    };
    Array_.push_ = function () {
        return curry_1.curry(function (v, ins) { return ins.push_(v); });
    };
    Array_.pop = function (ins) {
        return ins.pop();
    };
    Array_.fmap = function () {
        return curry_1.curry(function (f, ins) { return ins.fmap(f); });
    };
    Array_.map = function () {
        return curry_1.curry(function (f, ins) { return ins.map(f); });
    };
    Array_.forEach = function () {
        return curry_1.curry(function (f, ins) { return ins.forEach(f); });
    };
    Array_.filter = function () {
        return curry_1.curry(function (pred, ins) { return ins.filter(pred); });
    };
    Array_.some = function () {
        return curry_1.curry(function (pred, ins) { return ins.some(pred); });
    };
    Array_.every = function () {
        return curry_1.curry(function (pred, ins) { return ins.every(pred); });
    };
    Array_.clone = function (ins) {
        return ins.clone();
    };
    Array_.reverse = function (ins) {
        return ins.reverse();
    };
    Array_.slice = function () {
        return curry_1.curry(function (iBegin, iEnd, ins) { return ins.slice(iBegin, iEnd); });
    };
    Array_._slice = function () {
        return curry_1.curry(function (iBegin, iEnd, ins) { return ins._slice(iBegin, iEnd); });
    };
    return Array_;
}(Array_1.Array));
exports.Array = Array_;
exports["default"] = Array_;
