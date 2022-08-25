interface chooseOption {
    accept?: string;
    capture?: "user" | "environment";
    multiple?: boolean;
}
/**
 * 文件选择
 * @param options 文件选择配置
 * @param callback 回调函数, 参数为选择文件列表
 */
export default function chooseFile(options: chooseOption | undefined, callback: Function): void;
export {};
