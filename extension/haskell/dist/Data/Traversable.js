"use strict";
exports.__esModule = true;
exports.ITraversable = exports.Traversable = void 0;
var common_1 = require("../util/common");
var Traversable;
(function (Traversable) {
    Traversable.Def = (function (TraversableF) { return ({
        traverse: function (ApplicativeG) { return function (f) { return function (traversable) { return (common_1.assign(TraversableF.fmap(f)(traversable))(function (_) { return TraversableF.sequenceA(ApplicativeG)(_); })); }; }; },
        sequenceA: function (ApplicativeG) { return function (traversable) { return (common_1.assign(TraversableF.traverse(ApplicativeG))(function (_) { return _(common_1.id)(traversable); })); }; }
    }); });
    Traversable.Ext = (function (TraversableF) { return (common_1.define(function (Ext) { return ({}); })); });
    Traversable.enhance = function (_) { return (common_1.assign(common_1.Json.assign(Traversable.Def(_), _))(function (_) { return common_1.Json.assign(_, Traversable.Ext(_)); })); };
})(Traversable || (Traversable = {}));
exports.Traversable = Traversable;
exports.ITraversable = Traversable;
exports["default"] = Traversable;
