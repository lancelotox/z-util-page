interface EventBusConfig {
}
/**
 * 事件总线
 * on: 注册事件
 * emit: 触发事件
 */
export declare class EventBus {
    private static config;
    private static bucket;
    static on: (key: string, func: Function) => void;
    static emit: (key: string, ...rest: any[]) => void;
    constructor(config?: EventBusConfig);
    private config;
    private bucket;
    on: typeof EventBus.on;
    emit: typeof EventBus.emit;
}
export {};
