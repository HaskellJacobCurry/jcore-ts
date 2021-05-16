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
exports.Maybe = void 0;
var common_1 = require("../../ts-toolbelt/common");
var ts_toolbelt_1 = require("../../ts-toolbelt");
var Maybe = /** @class */ (function () {
    function Maybe() {
        this.a = undefined;
    }
    Maybe.prototype.map = function (f) {
        return 1;
    };
    Maybe.Nothing = function () { return new Maybe._Nothing(); };
    Maybe.Just = function (a) { return (function (just) {
        if (just === void 0) { just = new Maybe._Just(); }
        return just;
    })(); };
    return Maybe;
}());
(function (Maybe) {
    var Tag;
    (function (Tag) {
        Tag.Nothing = common_1.S('Nothing');
        Tag.Just = common_1.S('Just');
    })(Tag = Maybe.Tag || (Maybe.Tag = {}));
    var _Nothing = /** @class */ (function (_super) {
        __extends(_Nothing, _super);
        function _Nothing() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tag = Tag.Nothing;
            _this.cata = function (fs) { return fs[_this.tag](); };
            return _this;
        }
        return _Nothing;
    }(Maybe));
    Maybe._Nothing = _Nothing;
    var _Just = /** @class */ (function (_super) {
        __extends(_Just, _super);
        function _Just() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tag = Tag.Just;
            _this.cata = function (fs) { return fs[_this.tag](_this.a); };
            return _this;
        }
        return _Just;
    }(Maybe));
    Maybe._Just = _Just;
})(Maybe || (Maybe = {}));
var _Maybe = function (a) { return ((function (Maybe) { return (Maybe); })(ts_toolbelt_1.Json.assign(Maybe, {
    Lift: function (a) { return Maybe.Just(a); }
}))); };
exports.Maybe = _Maybe;
exports["default"] = Maybe;
