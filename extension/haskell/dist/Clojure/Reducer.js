"use strict";
exports.__esModule = true;
exports.stateless = exports.create = exports.Reducer = void 0;
var ITuple_1 = require("../Data/ITuple");
var IUnit_1 = require("../Data/IUnit");
var Reduced_1 = require("./Reduced");
var util_1 = require("../util");
var createReducer = util_1.create;
exports.create = createReducer;
var stateless = (function (f) { return createReducer({
    state: IUnit_1.IUnit(),
    complete: util_1.const_(util_1.id_()),
    step: function (s) { return function (b) { return function (a) { return ITuple_1.ITuple(s, Reduced_1.Reduced.Continue(f(b)(a))); }; }; }
}); });
exports.stateless = stateless;
var Reducer = util_1.Json.assign(createReducer, {
    create: createReducer,
    stateless: stateless
});
exports.Reducer = Reducer;
