"use strict";
exports.__esModule = true;
exports.Queue = void 0;
var Array_1 = require("./Array");
var Queue = /** @class */ (function () {
    function Queue() {
        this.array = new Array_1.Array();
        this.iFront = this.iEnd = 0;
    }
    Queue.prototype.enqueue_ = function (value) {
        this.array.push_(value);
        this.iEnd++;
        return this;
    };
    Queue.prototype.enqueue = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new Array_1.Array(values).foldl(function (acc, v) { return acc.enqueue_(v); }, this);
    };
    Queue.prototype.size = function () {
        return this.iEnd - this.iFront;
    };
    Queue.prototype._dequeue = function () {
        var value = this.array._at(this.iFront++);
        this.conditionalResize();
        return value;
    };
    Queue.prototype.dequeue = function () {
        if (this.size() == 0) {
            throw new Error('Queue.prototype.dequeue');
        }
        return this._dequeue();
    };
    Queue.prototype._front = function () {
        return this.array._at(this.iFront);
    };
    Queue.prototype.front = function () {
        if (this.size() == 0) {
            throw new Error('Queue.prototype.front');
        }
        return this._front();
    };
    Queue.prototype._back = function () {
        return this.array._at(this.iEnd - 1);
    };
    Queue.prototype.back = function () {
        if (this.size() == 0) {
            throw new Error('Queue.prototype.back');
        }
        return this._back();
    };
    Queue.prototype.conditionalResize = function () {
        var sz = this.size();
        if (sz * 2 < this.array.size()) {
            this.array = this.array._slice(this.iFront, this.iEnd);
            this.iFront = 0;
            this.iEnd = sz;
        }
    };
    return Queue;
}());
exports.Queue = Queue;
exports["default"] = Queue;
