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
exports.ff = exports.F = exports.Just = exports.Maybe = void 0;
exports.Maybe = function (a) { return (/** @class */ (function () {
    function _() {
        this.g = function () { return new (exports.Maybe(a))(); };
        this.map = function (f) {
            var cons = 1;
            return new (exports.Maybe(cons))();
        };
    }
    _.prototype.f = function () { return 1; };
    return _;
}())); };
exports.Just = function (a) { return (/** @class */ (function (_super) {
    __extends(_, _super);
    function _() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return _;
}(exports.Maybe(a)))); };
var F = /** @class */ (function () {
    function F() {
    }
    return F;
}());
exports.F = F;
var G = /** @class */ (function () {
    function G() {
    }
    return G;
}());
exports.ff = new (exports.Just(F))().map(function (a) { return new G(); }).map(function (a) { return 1; });
