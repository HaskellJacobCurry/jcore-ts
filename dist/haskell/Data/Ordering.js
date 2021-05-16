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
exports.Ordering = void 0;
var String_1 = require("./String");
var Bool_1 = require("./Bool");
var common_1 = require("../../ts-toolbelt/common");
var ts_toolbelt_1 = require("../../ts-toolbelt");
var Ordering = /** @class */ (function () {
    function Ordering() {
        var _this = this;
        this.construct = Ordering._LT;
        this.show = function () { return (_this.cata({
            LT: function () { return String_1.String.Lift('LT'); },
            GT: function () { return String_1.String.Lift('GT'); },
            EQ: function () { return String_1.String.Lift('EQ'); }
        })); };
        this.append = function (ordering) { return (_this.cata({
            LT: function () { return _this; },
            GT: function () { return _this; },
            EQ: function () { return ordering; }
        })); };
        this.eq = function (ordering) { return (_this.cata({
            LT: function () { return (ordering.cata({
                LT: function () { return Bool_1.Bool.True(); },
                GT: function () { return Bool_1.Bool.False(); },
                EQ: function () { return Bool_1.Bool.False(); }
            })); },
            GT: function () { return (ordering.cata({
                LT: function () { return Bool_1.Bool.False(); },
                GT: function () { return Bool_1.Bool.True(); },
                EQ: function () { return Bool_1.Bool.False(); }
            })); },
            EQ: function () { return (ordering.cata({
                LT: function () { return Bool_1.Bool.False(); },
                GT: function () { return Bool_1.Bool.False(); },
                EQ: function () { return Bool_1.Bool.True(); }
            })); }
        })); };
    }
    Ordering.LT = function () { return new Ordering._LT(); };
    Ordering.GT = function () { return new Ordering._GT(); };
    Ordering.EQ = function () { return new Ordering._EQ(); };
    return Ordering;
}());
(function (Ordering) {
    var Tag;
    (function (Tag) {
        Tag.LT = common_1.S('LT');
        Tag.GT = common_1.S('GT');
        Tag.EQ = common_1.S('EQ');
    })(Tag = Ordering.Tag || (Ordering.Tag = {}));
    var _LT = /** @class */ (function (_super) {
        __extends(_LT, _super);
        function _LT() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tag = Tag.LT;
            _this.cata = function (fs) { return fs[_this.tag](); };
            return _this;
        }
        return _LT;
    }(Ordering));
    Ordering._LT = _LT;
    var _GT = /** @class */ (function (_super) {
        __extends(_GT, _super);
        function _GT() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tag = Tag.GT;
            _this.cata = function (fs) { return fs[_this.tag](); };
            return _this;
        }
        return _GT;
    }(Ordering));
    Ordering._GT = _GT;
    var _EQ = /** @class */ (function (_super) {
        __extends(_EQ, _super);
        function _EQ() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tag = Tag.EQ;
            _this.cata = function (fs) { return fs[_this.tag](); };
            return _this;
        }
        return _EQ;
    }(Ordering));
    Ordering._EQ = _EQ;
})(Ordering || (Ordering = {}));
var Ordering_ = ((function (Ordering) { return (Ordering); })(ts_toolbelt_1.Json.assign(Ordering, {
    invert: (function (ordering) { return (ordering.cata({
        LT: function () { return Ordering.LT(); },
        GT: function () { return Ordering.LT(); },
        EQ: function () { return ordering; }
    })); })
})));
exports.Ordering = Ordering_;
exports["default"] = Ordering_;
