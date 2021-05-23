"use strict";
exports.__esModule = true;
exports.Semaphore = void 0;
var PromiseCapability_1 = require("./PromiseCapability");
var Queue_1 = require("../../dependency/dist/container/Queue");
var Semaphore = /** @class */ (function () {
    function Semaphore(concurrency) {
        this.availability = concurrency;
        this.queueResolve = new Queue_1.Queue();
    }
    Semaphore.prototype.acquire = function () {
        var capability = new PromiseCapability_1.PromiseCapability();
        this.queueResolve.enqueue_(capability.resolve);
        if (!(this.isLocked())) {
            this.dispatch();
        }
        return capability.promise;
    };
    Semaphore.prototype.isLocked = function () {
        return !(0 < this.availability);
    };
    Semaphore.prototype.dispatch = function () {
        var this_ = this;
        if (this.queueResolve.size() != 0) {
            var resolve = this.queueResolve._dequeue();
            this.availability--;
            resolve(function () {
                this_.availability++;
                this_.dispatch();
            });
        }
    };
    return Semaphore;
}());
exports.Semaphore = Semaphore;
exports["default"] = Semaphore;
