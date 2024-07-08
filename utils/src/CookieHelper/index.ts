/**
 * @module CookieHelper
 * @category Cookie操作辅助类
 */

/**
 * 根据key值获取cookie数据
 * @example
 * ```ts
 * getItem('test');
 * ```
 * @param key key值
 * @returns Cookie中key值为key的值
 */
export function getItem(key: string): string {
  return document.cookie.replace(new RegExp(`(?:(?:^|.*;\\s*)${key}\\s*=\\s*([^;]*).*$)|^.*$`), "$1");
}

/**
 * 根据key值获取cookie数据后删除Cookie中该键值对
 * @example
 * ```ts
 * getItemOnce('test');
 * ```
 * @param key key值
 * @returns Cookie中键值为key的值
 */
export function getItemOnce(key: string): string {
  const val = getItem(key);
  removeItem(`${key}`);
  return val;
}

/**
 * 设置cookie的键值对
 * @example
 * ```ts
 * setItem('test', '你好, 世界!');
 * ```
 * @param key 键
 * @param val 值
 */
export function setItem(key: string, val: string) {
  if (typeof val !== 'string') return false;
  document.cookie = `${key}=${val};path=/`;
  return true;
}

/**
 * 根据key值删除Cookie中键值对
 * @example
 * ```ts
 * removeItem('test');
 * ```
 * @param key key值
 */
export function removeItem(key: string) {
  document.cookie = `${key}=;path=/;expires=${new Date(0).toUTCString()}`;
}

/**
 * 根据key值判断Cookie中是否存在键值对
 * @example
 * ```ts
 * exist('test');
 * ```
 * @param key - key值
 */
export function exist(key: string) {
  const keys: Array<string> = document.cookie.match(/[^ =;]+(?==)/g) || [];
  return keys.includes(key);
}

/**
 * 清空cookie
 * @example
 * ```ts
 * clear();
 * ```
 */
export function clear() {
  const keys = document.cookie.match(/[^ =;]+(?==)/g);
  if (keys) {
    for (let i = keys.length; i--;) removeItem(keys[i]);
  }
}