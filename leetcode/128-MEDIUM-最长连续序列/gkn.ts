export function longestConsecutive(nums: number[]): number {
  const existedNumToLen: Record<number, number> = {}

  let maxLen = 0
  for (const num of nums) {
    if (existedNumToLen[num] !== undefined) {
      continue
    }

    let len = 1
    let isPrevExisted = false
    let isNextExisted = false
    if (existedNumToLen[num - 1] !== undefined) {
      len += existedNumToLen[num - 1]
      isPrevExisted = true
    }
    if (existedNumToLen[num + 1] !== undefined) {
      len += existedNumToLen[num + 1]
      isNextExisted = true
    }

    existedNumToLen[num] = len
    if (isPrevExisted) {
      for (let i = num - 1; existedNumToLen[i] !== undefined; i--) {
        existedNumToLen[i] = len
      }
    }
    if (isNextExisted) {
      for (let i = num + 1; existedNumToLen[i] !== undefined; i++) {
        existedNumToLen[i] = len
      }
    }

    maxLen = Math.max(maxLen, len)
  }

  return maxLen
}
