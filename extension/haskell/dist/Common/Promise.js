"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseCapability = exports.Promise = void 0;
var Promise_1 = require("../../dependency/jcore/dist/ts-toolbelt/Promise");
Object.defineProperty(exports, "Promise", { enumerable: true, get: function () { return Promise_1.Promise; } });
var PromiseCapability = Promise_1.makePromiseCapability();
exports.PromiseCapability = PromiseCapability;
