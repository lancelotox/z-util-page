import type { WorkSheet, WritingOptions } from 'xlsx';
/**
 * 将XLSX库转化出的sheet数据转化为Blob对象
 * https://www.npmjs.com/package/xlsx
 * @param sheetList 单个sheet或者sheet数组
 * @param sheetNameList 单个name或者name数组
 * @param options XLSX配置
 * @returns
 */
export default function sheet2blob(sheetList: Array<WorkSheet> | WorkSheet, sheetNameList: Array<string> | string, options: WritingOptions): Blob;
