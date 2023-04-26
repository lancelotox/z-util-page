
interface URLWithParam extends URL {
  param: {
    [key: string]: any
  }
}

/**
 * 解析统一资源定位符
 * @param url 统一资源定位符
 * @returns URLWithParam
 */
function parseUrl(url: string): URLWithParam | null {
  let Url: URLWithParam | null = null
  const param: any = {}
  try {
    Url = Object.assign(new URL(url), { param })
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

export default parseUrl