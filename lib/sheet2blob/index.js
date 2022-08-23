import * as XLSX from 'xlsx';
/**
 * 将XLSX库转化出的sheet数据转化为Blob对象
 * https://www.npmjs.com/package/xlsx
 * @param sheetList 单个sheet或者sheet数组
 * @param sheetNameList 单个name或者name数组
 * @param options XLSX配置
 * @returns
 */
export default function sheet2blob(sheetList, sheetNameList, options) {
    var workbook = {
        SheetNames: [],
        Sheets: {}
    };
    if (!Array.isArray(sheetNameList))
        sheetNameList = [sheetNameList];
    if (!Array.isArray(sheetList))
        sheetList = new Array(sheetList);
    if (Array.isArray(sheetList))
        sheetList.forEach(function (item, i) {
            workbook.SheetNames[i] = sheetNameList[i] || ('sheet' + (i + 1));
            workbook.Sheets[workbook.SheetNames[i]] = item;
        });
    //生成excel的配置项
    var wopts = Object.assign({
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
    }, options);
    var wbout = XLSX.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    // 字符串转ArrayBuffer
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i)
            view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    return blob;
}
