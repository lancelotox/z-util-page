export const CookieHelper = {
  getItem(key: string): string {
    return document.cookie.replace(new RegExp(`(?:(?:^|.*;\\s*)${key}\\s*=\\s*([^;]*).*$)|^.*$`), "$1");
  },
  getItemOnce(key: string): string {
    const val = CookieHelper.getItem(key);
    CookieHelper.removeItem(`${key}`);
    return val;
  },
  setItem(key: string, val: string) {
    if (typeof val !== 'string') return;
    document.cookie = `${key}=${val};path=/`;
  },
  removeItem(key: string) {
    document.cookie = `${key}=;path=/;expires=${new Date(0).toUTCString()}`;
  },
  exist(key: string) {
    const keys: Array<string> = document.cookie.match(/[^ =;]+(?==)/g) || [];
    return keys.includes(key);
  },
  clear() {
    const keys = document.cookie.match(/[^ =;]+(?==)/g);
    if (keys) {
      for (let i = keys.length; i--;) CookieHelper.removeItem(keys[i]);
    }
  }
};