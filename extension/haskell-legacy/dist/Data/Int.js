"use strict";
exports.__esModule = true;
exports.Int = void 0;
var String_1 = require("./String");
var Ordering_1 = require("./Ordering");
var Bool_1 = require("./Bool");
var Int = /** @class */ (function () {
    function Int() {
        var _this = this;
        this.construct = Int;
        this._ = 0;
        this.inc = function () { return Int.Lift(_this._ + 1); };
        this.dec = function () { return Int.Lift(_this._ - 1); };
        this.isEven = function () { return Bool_1.Bool.Lift(_this._ % 2 == 0); };
        this.isOdd = function () { return Bool_1.Bool.Lift(_this._ % 2 != 0); };
        this.show = function () { return String_1.String.Lift("" + _this._); };
        this.add = function (int) { return Int.Lift(_this._ + int._); };
        this.mul = function (int) { return Int.Lift(_this._ * int._); };
        this.sub = function (int) { return Int.Lift(_this._ - int._); };
        this.eq = function (int) { return Bool_1.Bool.Lift(_this._ == int._); };
        this.compare = function (int) { return (_this.lt(int).cata({
            True: function () { return Ordering_1.Ordering.LT(); },
            False: function () { return (int.lt(_this).cata({
                True: function () { return Ordering_1.Ordering.GT(); },
                False: function () { return Ordering_1.Ordering.EQ(); }
            })); }
        })); };
        this.lt = function (int) { return Bool_1.Bool.Lift(_this._ < int._); };
    }
    Int["default"] = new Int();
    Int.Lift = function (_) { return (function (int) {
        if (int === void 0) { int = new Int(); }
        return (int._ = _, int);
    })(); };
    Int.zero = function () { return Int.Lift(0); };
    Int.one = function () { return Int.Lift(1); };
    return Int;
}());
exports.Int = Int;
exports["default"] = Int;
