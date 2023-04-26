interface URLWithParam extends URL {
    param: {
        [key: string]: any;
    };
}
/**
 * 解析统一资源定位符
 * @param url 统一资源定位符
 * @returns URLWithParam
 */
declare function parseUrl(url: string): URLWithParam | null;
export default parseUrl;
