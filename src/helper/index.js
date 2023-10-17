"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clickElement = void 0;
/**
 * 触发dom对象点击事件
 * @param el dom对象
 */
function clickElement(el) {
    if (el.click && el.click instanceof Function)
        el.click();
    else if (window.MouseEvent) {
        el.dispatchEvent(new MouseEvent('click'));
    }
    else {
        let event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        el.dispatchEvent(event);
    }
}
exports.clickElement = clickElement;
