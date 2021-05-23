"use strict";
exports.__esModule = true;
exports.Stack = void 0;
var Array_1 = require("./Array");
var Stack = /** @class */ (function () {
    function Stack() {
        this.array = new Array_1.Array();
    }
    Stack.prototype.push = function (values) {
        this.array.push(values);
        return this;
    };
    Stack.prototype.push_ = function (value) {
        this.array.push_(value);
        return this;
    };
    Stack.prototype.pop = function () {
        return this.array.pop();
    };
    Stack.prototype.size = function () {
        return this.array.size();
    };
    return Stack;
}());
exports.Stack = Stack;
exports["default"] = Stack;
