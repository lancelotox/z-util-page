import { clickElement } from '../helper/index';
/**
 * 文件选择
 * @param options 文件选择配置
 * @param callback 回调函数, 参数为选择文件列表
 */
export default function chooseFile(options, callback) {
    if (options === void 0) { options = {}; }
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', options.accept || '');
    input.setAttribute('capture', options.capture || '');
    input.setAttribute('multiple', (options.multiple || false).toString());
    input.addEventListener('change', function (e) {
        callback(input.files);
    });
    clickElement(input);
}
