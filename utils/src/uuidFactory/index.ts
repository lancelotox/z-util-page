/**
 * @category 辅助函数-生成UUID4
 * @param length 生成uuid的总长度，不传递则按照rfc4122标准生成uuid
 * @param radix uuid每个字符的基数 1-62
 * @returns uuid字符串
 */
export function generateUUID(length?: number, radix?: number){
	let chars: Array<string> = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	let uuid: Array<string> = [];
	radix = radix || chars.length;

	if(length) {
	  for(let i = 0; i < length; i++) 
	  	uuid[i] = chars[0 | Math.random() * radix];
	}else {
	  let r: number;

	  uuid[8] = uuid[13] = uuid[18] = uuid[23] =  '-';
	  uuid[14] = '4';

	  for(let i = 0; i < 36; i++) {
		if(!uuid[i]) {
		  r = 0 | Math.random()*16;
		  uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
		}
	  }
	}
	return uuid.join('');
}
