"use strict";
exports.__esModule = true;
var ISemiring_1 = require("../ISemiring");
var Int = /** @class */ (function () {
    function Int() {
        this.construct = Int;
        this.add = 1;
        this.mul = 1;
        this.append = 1;
    }
    Int.zero = function () { return 1; };
    Int.one = function () { return 1; };
    return Int;
}());
var s = ISemiring_1.Semiring.zero(Int)();
