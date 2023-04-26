/**
 * 解析统一资源定位符
 * @param url 统一资源定位符
 * @returns URLWithParam
 */
function parseUrl(url) {
    var Url = null;
    var param = {};
    try {
        Url = Object.assign(new URL(url), { param: param });
    }
    catch (error) {
        console.log(error);
    }
    if (Url === null)
        return null;
    var search = Url.search.slice(1);
    var paramList = search.split('&').map(function (item) { return item.split('='); });
    paramList.forEach(function (item) {
        param[item[0]] = item[1];
    });
    return Url;
}
export default parseUrl;
