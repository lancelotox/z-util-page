
interface URLWithParam {
  hash: string,
  host: string,
  hostname: string,
  href: string,
  origin: string,
  password: string,
  pathname: string,
  port: string,
  protocol: string,
  search: string,
  username: string,
  searchParams: {
    [key: string]: any
  }
}

/**
 * 解析URL
 * @category 辅助函数
 * @param url 统一资源定位符
 * @returns URLWithParam
 */
export function parseUrl(url: string): URLWithParam | null {
  let Url: URLWithParam | null = null
  const param: any = {}
  try {
    const temp = new URL(url)
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
    }
  } catch (error) {
    console.log(error)
  }
  if (Url === null) return null
  
  const search: string = Url.search.slice(1)
  const paramList = search.split('&').map(item => item.split('='))
  paramList.forEach(item => {
    param[item[0]] = item[1]
  })
  return Url
}