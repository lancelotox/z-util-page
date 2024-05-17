/**
 * 解析统一资源定位符
 * @param url 统一资源定位符
 * @returns URLWithParam
 */
function parseUrl(url) {
    let Url = null;
    const param = {};
    try {
        const temp = new URL(url);
        Url = {
            hash: temp.hash,
            host: temp.host,
            hostname: temp.hostname,
            href: temp.href,
            origin: temp.origin,
            password: temp.password,
            pathname: temp.pathname,
            port: temp.port,
            protocol: temp.protocol,
            search: temp.search,
            username: temp.username,
            searchParams: param
        };
    }
    catch (error) {
        console.log(error);
    }
    if (Url === null)
        return null;
    const search = Url.search.slice(1);
    const paramList = search.split('&').map(item => item.split('='));
    paramList.forEach(item => {
        param[item[0]] = item[1];
    });
    return Url;
}
export default parseUrl;
