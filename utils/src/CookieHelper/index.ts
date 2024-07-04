/**
 * 模块配置:
 * @category 命名空间
 * @module CookieHelper - Cookie辅助操作类
 */


/**
 * 根据key值获取cookie数据
 * @param key key值
 * @returns 数据
 */
export function getItem(key: string): string {
  return document.cookie.replace(new RegExp(`(?:(?:^|.*;\\s*)${key}\\s*=\\s*([^;]*).*$)|^.*$`), "$1");
}

export function getItemOnce(key: string): string {
  const val = getItem(key);
  removeItem(`${key}`);
  return val;
}

export function setItem(key: string, val: string) {
  if (typeof val !== 'string') return;
  document.cookie = `${key}=${val};path=/`;
}

export function removeItem(key: string) {
  document.cookie = `${key}=;path=/;expires=${new Date(0).toUTCString()}`;
}

export function exist(key: string) {
  const keys: Array<string> = document.cookie.match(/[^ =;]+(?==)/g) || [];
  return keys.includes(key);
}

export function clear() {
  const keys = document.cookie.match(/[^ =;]+(?==)/g);
  if (keys) {
    for (let i = keys.length; i--;) removeItem(keys[i]);
  }
}