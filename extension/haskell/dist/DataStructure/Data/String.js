"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.fromI = exports.String = exports.URI = void 0;
var common_1 = require("../../Common/common");
var URI = common_1.S('String');
exports.URI = URI;
var fromI = (function (string) { return common_1.cast(common_1.Json.assign(string, { URI: URI }))(); });
exports.fromI = fromI;
var createString = (function (value) { return ({
    URI: URI,
    value: value,
    toString: function () { return value; },
}); });
exports.create = createString;
var String = (common_1.Json.assign(createString, {
    URI: URI,
    create: createString,
    fromI: fromI,
}));
exports.String = String;
exports.default = String;
