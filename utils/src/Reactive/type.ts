// 数组触发类型枚举
export enum TriggerType {
  SET,
  ADD,
  DELETE
}

export type Instrumentations = {
  [propName: string | symbol]: Function
}