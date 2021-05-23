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
exports.OrderedMap = void 0;
var OrderedMultiMap_1 = require("./OrderedMultiMap");
var OrderedMap = /** @class */ (function (_super) {
    __extends(OrderedMap, _super);
    function OrderedMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrderedMap.prototype.setTree = function (value, key) {
        if (key === void 0) { key = this.getKey(value); }
        return this.isEmpty() ? _super.prototype.setTree.call(this, value, key) : this;
    };
    return OrderedMap;
}(OrderedMultiMap_1.OrderedMultiMap));
exports.OrderedMap = OrderedMap;
exports["default"] = OrderedMap;
