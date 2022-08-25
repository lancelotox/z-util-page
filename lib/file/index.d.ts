/**
 * H5文件下载方法
 * @param url 资源链接或者blob对象
 * @param saveFileName 保存文件名
 */
export declare function saveFile(url: string | Blob, saveFileName: string): void;
/**
 * 文件读取
 * @param file File对象或Blob对象
 */
declare type callback = (res: any) => void;
declare class FileReaderDecorate {
    reader: FileReader;
    file: File | Blob;
    constructor(file: File | Blob);
    abort(fun: callback): this;
    error(fun: callback): this;
    load(fun: callback): this;
    loadstart(fun: callback): this;
    loadend(fun: callback): this;
    progress(fun: callback): this;
    getStatus(): number;
    getResult(): string | ArrayBuffer | null;
    start(type: "ArrayBuffer" | "BinaryString" | "DataURL" | "Text"): this;
    stop(): this;
}
export declare function readFile(file: File | Blob): FileReaderDecorate;
/**
 * 文件选择
 * @param options 文件选择配置
 * @param callback 回调函数, 参数为选择文件列表
 */
interface chooseOption {
    accept?: string;
    capture?: "user" | "environment";
    multiple?: boolean;
}
export declare function chooseFile(options: chooseOption | undefined, callback: Function): void;
export {};
