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
exports.OrderedMultiSet = void 0;
var AVLTree_1 = require("./AVLTree");
var Array_1 = require("./Array");
var ts_toolbelt_1 = require("../ts-toolbelt");
var OrderedMultiSet = /** @class */ (function (_super) {
    __extends(OrderedMultiSet, _super);
    function OrderedMultiSet(compareKey) {
        if (compareKey === void 0) { compareKey = ts_toolbelt_1.Any.compare; }
        return _super.call(this, function (_) { return _; }, compareKey) || this;
    }
    OrderedMultiSet.prototype.add_ = function (value) {
        return this.insert_(value);
    };
    OrderedMultiSet.prototype.add = function (values) {
        return this.insert(values);
    };
    OrderedMultiSet.prototype.contain = function (value) {
        return this.findByKey(value).length != 0;
    };
    OrderedMultiSet.prototype.forEach = function (cb) {
        return this.inorderTraverse(function (key, values) { return new Array_1.Array(values).forEach(cb); });
    };
    OrderedMultiSet.prototype.forEach_ = function (cb) {
        return this.inorderTraverse(function (key, values) {
            for (var i = 0; i < values.length; i++) {
                if (!cb(values[i])) {
                    return false;
                }
            }
            return true;
        });
    };
    return OrderedMultiSet;
}(AVLTree_1.AVLTree));
exports.OrderedMultiSet = OrderedMultiSet;
exports["default"] = OrderedMultiSet;
