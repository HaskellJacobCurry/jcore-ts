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
exports.Nothing = exports.Just = exports.Maybe = void 0;
var common_1 = require("../../dependency/jcore/dist/ts-toolbelt/common");
var ts_toolbelt_1 = require("../../dependency/jcore/dist/ts-toolbelt");
var Tag;
(function (Tag) {
    Tag.Nothing = common_1.S('Nothing');
    Tag.Just = common_1.S('Just');
})(Tag || (Tag = {}));
exports.Maybe = function (A) { return ((function (Maybe_) {
    var _a;
    if (Maybe_ === void 0) { Maybe_ = exports.Maybe; }
    return (_a = /** @class */ (function () {
            function Maybe() {
                var _this = this;
                this.construct = Maybe;
                this.a = ts_toolbelt_1.cast()();
                this.tag = Tag.Nothing;
                this.cata = function (fs) { return fs[Tag.Nothing](); };
                this.map = function (f) {
                    var MaybeB = Maybe_(ts_toolbelt_1.cast()());
                    var ret = ts_toolbelt_1.cast()();
                    ret = _this.cata({
                        Just: function (a) { return ((function (b, B) {
                            if (b === void 0) { b = f(a); }
                            if (B === void 0) { B = b.construct; }
                            return (Maybe_(B).Just(b));
                        })()); },
                        Nothing: function () { return Maybe_(A).Nothing(); }
                    });
                    return ret;
                };
            }
            return Maybe;
        }()),
        _a["default"] = new _a(),
        _a.Just = function (_) { return new (exports.Just(A))(_); },
        _a.Nothing = function () { return new (exports.Nothing(A))(); },
        _a);
})()); };
exports.Just = function (A) { return ((function (Just_) {
    if (Just_ === void 0) { Just_ = exports.Just; }
    return (/** @class */ (function (_super) {
        __extends(Just, _super);
        function Just(a) {
            var _this = _super.call(this) || this;
            _this.tag = Tag.Just;
            _this.cata = function (fs) { return fs[_this.tag](_this.a); };
            _this.a = a;
            return _this;
        }
        return Just;
    }(exports.Maybe(A))));
})()); };
exports.Nothing = function (A) { return ((function (Nothing_) {
    if (Nothing_ === void 0) { Nothing_ = exports.Nothing; }
    return (/** @class */ (function (_super) {
        __extends(Nothing, _super);
        function Nothing() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tag = Tag.Nothing;
            _this.cata = function (fs) { return fs[_this.tag](); };
            return _this;
        }
        return Nothing;
    }(exports.Maybe(A))));
})()); };
