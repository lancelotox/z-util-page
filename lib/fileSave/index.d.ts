/**
 * H5文件下载方法
 * @param url 资源链接或者blob对象
 * @param saveFileName 保存文件名
 * @param callback 保存完成回调函数
 */
export declare function fileSave(url: string | Blob, saveName: string, callback: Function): void;
