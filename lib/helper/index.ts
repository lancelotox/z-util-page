export function clickElement(el: HTMLElement) {
    if (el.click && el.click instanceof Function) el.click();
    else if (window.MouseEvent) {
        el.dispatchEvent(new MouseEvent('click'));
    } else {
        let event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        el.dispatchEvent(event);
    }
}