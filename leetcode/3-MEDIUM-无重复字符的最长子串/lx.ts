export function lengthOfLongestSubstring(s: string): number {
  let number = 0
  const subs = new Set()
  let rp = -1
  for (let lp = 0; lp < s.length; lp++) {
    if (lp !== 0) {
      subs.delete(s.charAt(lp - 1))
    }
    while (rp + 1 < s.length && !subs.has(s.charAt(rp + 1))) {
      subs.add(s.charAt(rp + 1))
      rp++
    }
    number = Math.max(number, rp - lp + 1)
  }
  return number
};
// 外层循环左指针lp，内层循环右指针rp，
// 当右指针指向的字符在set中不存在时，将字符添加到set中，右指针右移，
// 当右指针指向的字符在set中存在时，将左指针指向的字符从set中删除，左指针右移，
// 每次循环计算当前子串长度，与number比较，取最大值。
