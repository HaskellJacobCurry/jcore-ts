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
exports.OrderedMultiMap = void 0;
var AVLTree_1 = require("./AVLTree");
var Array_1 = require("./Array");
var ts_toolbelt_1 = require("../ts-toolbelt");
var OrderedMultiMap = /** @class */ (function (_super) {
    __extends(OrderedMultiMap, _super);
    function OrderedMultiMap(compareKey) {
        if (compareKey === void 0) { compareKey = ts_toolbelt_1.Any.compare; }
        return _super.call(this, function (value) { return value.key; }, compareKey) || this;
    }
    OrderedMultiMap.prototype.set = function (key, value) {
        return this.insert_({ key: key, value: value });
    };
    OrderedMultiMap.prototype.unset = function (key) {
        return this.remove_(this.makeValue(key));
    };
    OrderedMultiMap.prototype.unsetOne = function (key) {
        return this.removeOne_(this.makeValue(key));
    };
    OrderedMultiMap.prototype.get = function (key) {
        return new Array_1.Array(this.findByKey(key)).map(function (_a) {
            var value = _a.value;
            return value;
        }).unlift();
    };
    OrderedMultiMap.prototype.contain = function (key) {
        return this.findByKey(key).length != 0;
    };
    OrderedMultiMap.prototype.forEach = function (cb) {
        return this.inorderTraverse(function (key, values) { return new Array_1.Array(values).forEach(function (_a) {
            var value = _a.value;
            return cb(key, value);
        }); });
    };
    OrderedMultiMap.prototype.forEach_ = function (cb) {
        return this.inorderTraverse(function (_, values) {
            for (var i = 0; i < values.length; i++) {
                var _a = values[i], key = _a.key, value = _a.value;
                if (!cb(key, value)) {
                    return false;
                }
            }
            return true;
        });
    };
    OrderedMultiMap.prototype.makeValue = function (key) {
        return { key: key, value: ts_toolbelt_1.reinterpret() };
    };
    return OrderedMultiMap;
}(AVLTree_1.AVLTree));
exports.OrderedMultiMap = OrderedMultiMap;
exports["default"] = OrderedMultiMap;
