import { mergeObject } from "../mergeObject";

// 配置
interface EventBusConfig {}

// 数据桶
interface Bucket {
  [key: string]: Array<(...rest: any[]) => void>
}

/**
 * @category 事件总线
 * @example
 * ```ts
 * // 总线
 * let count = 0;
 * EventBus.on('test', function (num, num1) {
 *   count = num + num1;
 * })
 * EventBus.emit('test', 1, 2);
 * expect(count).toBe(3);
 * 
 * // 分线
 * let count = 0;
 * const bus = new EventBus();
 * bus.on('test', function (num, num1) {
 *   count = num + num1;
 * })
 * bus.emit('test', 3, 4);
 * expect(count).toBe(7);
 * ```
 */
export class EventBus {
  private static config: EventBusConfig = {}

  private static bucket: Bucket = {}

  /**
   * 监听事件
   * @param key 事件名
   * @param func 回调函数
   */
  public static on(key: string, func: (...rest: any[]) => void) {
    let funcSet = this.bucket[key];
    if (!funcSet) funcSet = this.bucket[key] = [];
    const re = funcSet.find(item => item === func);
    if (re || typeof func !== 'function') return;
    funcSet.push(func);
  }

  /**
   * 触发事件
   * @param key 事件名
   * @param rest 传给回调函数的参数
   */
  public static emit(key: string, ...rest: any[]) {
    const funcSet = this.bucket[key];
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