/**
 * H5文件下载方法
 * @param url 资源链接或者blob对象
 * @param saveFileName 保存文件名
 */
export function fileSave(url, saveFileName) {
    if (typeof url === 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url);
    }
    var alink = document.createElement('a');
    alink.href = url;
    alink.download = saveFileName || '';
    if (alink.click && alink.click instanceof Function)
        alink.click();
    else if (window.MouseEvent) {
        alink.dispatchEvent(new MouseEvent('click'));
    }
    else {
        var event_1 = document.createEvent('MouseEvents');
        event_1.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        alink.dispatchEvent(event_1);
    }
}
