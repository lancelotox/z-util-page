/**
 * H5文件下载方法
 * @param url 资源链接或者blob对象
 * @param saveFileName 保存文件名
 */
export function fileSave(url: string | Blob, saveFileName: string) {
    if (typeof url === 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url);
    }
    let alink = document.createElement('a');
    alink.href = url;
    alink.download = saveFileName || '';
    if (alink.click && alink.click instanceof Function) alink.click();
    else if (window.MouseEvent) {
        alink.dispatchEvent(new MouseEvent('click'));
    } else {
        let event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0 ,null);
        alink.dispatchEvent(event);
    }
}