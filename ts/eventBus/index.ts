import { mergeObject } from "../mergeObject";

// 配置
interface EventBusConfig {}

// 数据桶
interface Bucket {
  [key: string]: Array<Function>
}

/**
 * 事件总线
 * on: 注册事件
 * emit: 触发事件
 */
export class EventBus {
  private static config: EventBusConfig = {}

  private static bucket: Bucket = {}

  public static on = function(key: string, func: Function) {
    let funcSet = this.bucket[key];
    if (!funcSet) funcSet = this.bucket[key] = [];
    const re = funcSet.find(item => item === func);
    if (re || typeof func !== 'function') return;
    funcSet.push(func);
  }

  public static emit = function(key: string, ...rest: any[]) {
    let funcSet = this.bucket[key];
    if (!funcSet) return;
    funcSet.forEach(function (func) {
      func(...rest);
    });
  }

  constructor(config?: EventBusConfig) {
    this.config = mergeObject({
      maxEventCount: 10000
    }, EventBus.config, config || {});
    this.bucket = {};
    this.on = EventBus.on;
    this.emit = EventBus.emit;
  }
  private config: EventBusConfig
  private bucket: Bucket
  public on: typeof EventBus.on
  public emit: typeof EventBus.emit
}