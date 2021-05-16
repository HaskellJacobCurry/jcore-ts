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
exports.Bool = void 0;
var IBool_1 = require("./IBool");
var String_1 = require("./String");
var common_1 = require("../../ts-toolbelt/common");
var ts_toolbelt_1 = require("../../ts-toolbelt");
var Bool = /** @class */ (function () {
    function Bool() {
        var _this = this;
        this.construct = Bool._True;
        this.show = function () { return (_this.cata({
            True: function () { return String_1.String.Lift('True'); },
            False: function () { return String_1.String.Lift('False'); }
        })); };
        this.not = function () { return (_this.cata({
            True: function () { return Bool.False(); },
            False: function () { return Bool.True(); }
        })); };
        this.and = function (bool) { return (_this.cata({
            True: function () { return bool; },
            False: function () { return _this; }
        })); };
        this.or = function (bool) { return (_this.cata({
            True: function () { return _this; },
            False: function () { return bool; }
        })); };
    }
    Bool.True = function () { return new Bool._True(); };
    Bool.False = function () { return new Bool._False(); };
    return Bool;
}());
(function (Bool) {
    var Tag;
    (function (Tag) {
        Tag.True = common_1.S('True');
        Tag.False = common_1.S('False');
    })(Tag = Bool.Tag || (Bool.Tag = {}));
    var _True = /** @class */ (function (_super) {
        __extends(_True, _super);
        function _True() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tag = Tag.True;
            _this.cata = function (fs) { return fs[_this.tag](); };
            return _this;
        }
        return _True;
    }(Bool));
    Bool._True = _True;
    var _False = /** @class */ (function (_super) {
        __extends(_False, _super);
        function _False() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tag = Tag.False;
            _this.cata = function (fs) { return fs[_this.tag](); };
            return _this;
        }
        return _False;
    }(Bool));
    Bool._False = _False;
})(Bool || (Bool = {}));
var _Bool = ((function (Bool) { return (Bool); })(ts_toolbelt_1.Json.assign(Bool, {
    Lift: function (_) { return _ ? Bool.True() : Bool.False(); },
    not: function (bool) { return IBool_1.Bool.not(bool); },
    and: function (bool0) { return function (bool1) { return IBool_1.Bool.and(bool0)(bool1); }; },
    or: function (bool0) { return function (bool1) { return IBool_1.Bool.or(bool0)(bool1); }; }
})));
exports.Bool = _Bool;
exports["default"] = _Bool;
