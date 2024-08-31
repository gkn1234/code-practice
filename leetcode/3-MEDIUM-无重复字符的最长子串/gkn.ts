export function lengthOfLongestSubstring(s: string): number {
  if (s.length === 0 || s.length === 1)
    return s.length

  const existedWord = new Set<string>()
  let result = 1
  let j = 0
  for (let i = 0; i < s.length && j < s.length; i++) {
    while (j < s.length && !existedWord.has(s[j])) {
      existedWord.add(s[j])
      j++
    }

    result = Math.max(result, j - i)
    existedWord.delete(s[i])
  }

  return result
};
