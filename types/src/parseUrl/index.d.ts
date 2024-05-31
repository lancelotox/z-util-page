interface URLWithParam {
    hash: string;
    host: string;
    hostname: string;
    href: string;
    origin: string;
    password: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
    username: string;
    searchParams: {
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
