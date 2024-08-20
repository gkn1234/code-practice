export function groupAnagrams(strs: string[]): string[][] {
  const myTypedMap: Map<string, string[]> = new Map()

  for (let i = 0; i < strs.length; i++) {
    const key = sortStr(strs[i])
    if (myTypedMap.has(key)) {
      const value = myTypedMap.get(key) || []
      value.push(strs[i])
    }
    else {
      myTypedMap.set(key, [strs[i]])
    }
  }

  return Array.from(myTypedMap.values())
};
function sortStr(str: string): string {
  const s = str.split('').sort().join('')
  return s
}
