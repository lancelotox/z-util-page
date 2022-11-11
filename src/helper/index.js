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
        var event_1 = document.createEvent('MouseEvents');
        event_1.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        el.dispatchEvent(event_1);
    }
}
export { clickElement };
