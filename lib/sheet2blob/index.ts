import * as XLSX from 'xlsx';
import XLSXStyle from 'xlsx-style';

export default function sheet2blob(sheetList, sheetNameList, options) {
    let workbook = {
        SheetNames: [],
        Sheets: {}
    }
    if (!(sheetNameList instanceof Array))
        sheetNameList = [sheetNameList];
    if (!(sheetList instanceof Array))
        sheetList = [sheetList];
    sheetList.forEach((item,i)=>{
        workbook.SheetNames[i] = sheetNameList[i] || ('sheet' + (i + 1));
        workbook.Sheets[workbook.SheetNames[i]] = item;
    })
    //生成excel的配置项
    let wopts = {
        bookType: 'xlsx',//要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    }
    let wbout = XLSX.write(workbook, wopts);
    if(options && options['style']) wbout = XLSXStyle.write(workbook, wopts);
    let blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
    // 字符串转ArrayBuffer
    function s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i != s.length ; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    return blob;
}