export function threeSum(nums: number[]): number[][] {
  const number: number[][] = []
  for (let i = 0; i < nums.length; i++) {
    const currNum = nums[i]
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (currNum + nums[j] + nums[k] === 0) {
          const sortedArr = [currNum, nums[j], nums[k]].sort()
          const isDuplicate = number.some(item => JSON.stringify(item) === JSON.stringify(sortedArr))
          if (!isDuplicate) {
            number.push(sortedArr)
          }
        }
      }
    }
  }
  return number
};
// 暴力解法，必须进行去重，超时，需要知道如何使用双指针进行解答
// 不知道该如何书写该题目的断言
