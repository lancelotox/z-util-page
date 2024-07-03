/**
 * 生成UUID4
 * @param length 生成uuid的总长度，不传递则按照rfc4122标准生成uuid
 * @param radix uuid每个字符的基数 1-62
 * @returns uuid字符串
 */
export default function generateUUID(length?: number, radix?: number): string;
