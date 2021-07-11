"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITraversable = exports.Traversable = void 0;
var common_1 = require("../../Common/common");
var Traversable;
(function (Traversable) {
    Traversable.Def = (function (TraversableF) { return ({
        traverse: function (ApplicativeG) { return function (f) { return function (traversable) { return (common_1.assign(TraversableF.fmap(f)(traversable))(function (_) { return TraversableF.sequenceA(ApplicativeG)(_); })); }; }; },
        sequenceA: function (ApplicativeG) { return function (traversable) { return (common_1.assign(TraversableF.traverse(ApplicativeG))(function (_) { return _(common_1.id)(traversable); })); }; },
    }); });
    Traversable.Ext = (function (TraversableF) { return (common_1.define(function (Ext) { return ({
        mapM: function (MonadG) { return TraversableF.traverse(MonadG); },
        sequenceM: function (MonadG) { return TraversableF.sequenceA(MonadG); },
        sequence: function (MonadG) { return Ext().sequenceM(MonadG); },
    }); })); });
    Traversable.instantiate = (function (_) { return (common_1.assign(common_1.Json.assign(Traversable.Def(_), _))(function (_) { return common_1.Json.assign(_, Traversable.Ext(_)); })); });
})(Traversable || (Traversable = {}));
exports.Traversable = Traversable;
exports.ITraversable = Traversable;
var ITraversable1;
(function (ITraversable1) {
    ITraversable1.Def = (function (TraversableF) { return ({
        traverse: function (ApplicativeG) { return function (f) { return function (traversable) { return (common_1.assign(TraversableF.fmap(f)(traversable))(function (_) { return TraversableF.sequenceA(ApplicativeG)(_); })); }; }; },
        sequenceA: function (ApplicativeG) { return function (traversable) { return (common_1.assign(TraversableF.traverse(ApplicativeG))(function (_) { return _(common_1.id)(traversable); })); }; },
    }); });
    ITraversable1.Ext = (function (TraversableF) { return (common_1.define(function (Ext) { return ({
        mapM: function (MonadG) { return TraversableF.traverse(MonadG); },
        sequenceM: function (MonadG) { return TraversableF.sequenceA(MonadG); },
        sequence: function (MonadG) { return Ext().sequenceM(MonadG); },
    }); })); });
    ITraversable1.instantiate = (function (_) { return (common_1.assign(common_1.Json.assign(ITraversable1.Def(_), _))(function (_) { return common_1.Json.assign(_, ITraversable1.Ext(_)); })); });
})(ITraversable1 || (ITraversable1 = {}));
exports.default = Traversable;
