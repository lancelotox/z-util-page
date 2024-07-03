export const CookieHelper = {
    getItem(key) {
        return document.cookie.replace(new RegExp(`(?:(?:^|.*;\\s*)${key}\\s*=\\s*([^;]*).*$)|^.*$`), "$1");
    },
    getItemOnce(key) {
        const val = CookieHelper.getItem(key);
        CookieHelper.removeItem(`${key}`);
        return val;
    },
    setItem(key, val) {
        if (typeof val !== 'string')
            return;
        document.cookie = `${key}=${val};path=/`;
    },
    removeItem(key) {
        document.cookie = `${key}=;path=/;expires=${new Date(0).toUTCString()}`;
    },
    exist(key) {
        const keys = document.cookie.match(/[^ =;]+(?==)/g) || [];
        return keys.includes(key);
    },
    clear() {
        const keys = document.cookie.match(/[^ =;]+(?==)/g);
        if (keys) {
            for (let i = keys.length; i--;)
                CookieHelper.removeItem(keys[i]);
        }
    }
};
