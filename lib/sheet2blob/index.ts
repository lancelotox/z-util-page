import * as XLSX from 'xlsx';
import type { WorkSheet, WritingOptions } from 'xlsx';

interface WorkbookMap {
    SheetNames: Array<string>,
    Sheets: {
        [propName: string]: WorkSheet
    }
}

/**
 * 将XLSX库转化出的sheet数据转化为Blob对象
 * https://www.npmjs.com/package/xlsx
 * @param sheetList 单个sheet或者sheet数组
 * @param sheetNameList 单个name或者name数组
 * @param options XLSX配置
 * @returns 
 */
export default function sheet2blob(sheetList: Array<WorkSheet> | WorkSheet, sheetNameList: Array<string> | string, options: WritingOptions): Blob {
    let workbook: WorkbookMap = {
        SheetNames: [],
        Sheets: {}
    }
    if (!Array.isArray(sheetNameList)) sheetNameList = [sheetNameList];
    if (!Array.isArray(sheetList)) sheetList = new Array<WorkSheet>(sheetList);
    if (Array.isArray(sheetList)) sheetList.forEach((item, i) => {
        workbook.SheetNames[i] = sheetNameList[i] || ('sheet' + (i + 1));
        workbook.Sheets[workbook.SheetNames[i]] = item;
    })
    //生成excel的配置项
    let wopts: WritingOptions = Object.assign({
        bookType: 'xlsx',//要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    }, options)
    let wbout: any = XLSX.write(workbook, wopts);
    let blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    // 字符串转ArrayBuffer
    function s2ab(s: any) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    return blob;
}