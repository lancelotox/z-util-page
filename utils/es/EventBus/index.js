import { mergeObject } from "../mergeObject";
/**
 * 事件总线
 * on: 注册事件
 * emit: 触发事件
 */
export class EventBus {
    static on(key, func) {
        let funcSet = this.bucket[key];
        if (!funcSet)
            funcSet = this.bucket[key] = [];
        const re = funcSet.find(item => item === func);
        if (re || typeof func !== 'function')
            return;
        funcSet.push(func);
    }
    static emit(key, ...rest) {
        const funcSet = this.bucket[key];
        if (!funcSet)
            return;
        funcSet.forEach(function (func) {
            func(...rest);
        });
    }
    constructor(config) {
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "bucket", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "on", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "emit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.config = mergeObject({
            maxEventCount: 10000
        }, EventBus.config, config || {});
        this.bucket = {};
        this.on = EventBus.on;
        this.emit = EventBus.emit;
    }
}
Object.defineProperty(EventBus, "config", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {}
});
Object.defineProperty(EventBus, "bucket", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {}
});
