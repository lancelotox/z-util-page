import { clickElement } from '../helper/index';
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
    clickElement(alink);
}
