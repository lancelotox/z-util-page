import { clickElement } from '../helper/index';

interface chooseOption {
    //以逗号为分隔的[唯一文件类型说明符]列表
    accept?: string,
    //尝试请求使用设备的媒体捕获设备（如：摄像机），而不是请求一个文件输入。
    capture?: "user" | "environment",
    //是否允许多选
    multiple?: boolean
}

/**
 * 文件选择
 * @param options 文件选择配置
 * @param callback 回调函数, 参数为选择文件列表
 */
export default function chooseFile(options: chooseOption = {}, callback: Function) {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', options.accept || '');
    input.setAttribute('capture', options.capture || '');
    input.setAttribute('multiple', (options.multiple || false).toString());
    input.addEventListener('change', function (e) {
        callback(input.files);
    });
    clickElement(input);
}