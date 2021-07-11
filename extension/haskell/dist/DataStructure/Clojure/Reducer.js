"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateless = exports.create = exports.Reducer = void 0;
var ITuple_1 = require("../../Typeclass/Data/ITuple");
var IUnit_1 = require("../../Typeclass/Data/IUnit");
var Reduced_1 = require("./Reduced");
var Common_1 = require("../../Common");
var createReducer = Common_1.create;
exports.create = createReducer;
var stateless = (function (f) { return createReducer({
    state: IUnit_1.IUnit(),
    complete: Common_1.const_(Common_1.id_()),
    step: function (s) { return function (b) { return function (a) { return ITuple_1.ITuple(s, Reduced_1.Reduced.Continue(f(b)(a))); }; }; },
}); });
exports.stateless = stateless;
var Reducer = (Common_1.Json.assign(createReducer, {
    create: createReducer,
    stateless: stateless,
}));
exports.Reducer = Reducer;
