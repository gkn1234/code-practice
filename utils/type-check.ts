/** 判断一个值是否为有具体值的数字，不包括 NaN 和 Infinity */
export function isNum(val: unknown): val is number {
  return typeof val === 'number' && !Number.isNaN(val) && Math.abs(val) !== Number.POSITIVE_INFINITY
}

/** 判断一个字符串是否为数字字符串，该字符串必须为具体值，不包括 NaN 和 Infinity */
export function isNumStr(val: string): val is `${number}` {
  return val !== '' && val !== null && isNum(Number(val))
}