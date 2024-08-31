export function threeSum(nums: number[]): number[][] {
  const existedNumToCount: Record<number, number> = {}

  nums.forEach((num) => {
    existedNumToCount[num] = (existedNumToCount[num] || 0) + 1
  })

  nums.sort((a, b) => a - b)

  const results: number[][] = []
  let left = 0
  let right = nums.length - 1
  existedNumToCount[nums[left]]--
  existedNumToCount[nums[right]]--
  while (left < right && nums[left] <= 0 && nums[right] >= 0) {
    const target = 0 - nums[left] - nums[right]

    if (existedNumToCount[target]) {
      results.push([nums[left], nums[right], target])
    }

    if (target > 0) {
      left++
      existedNumToCount[nums[left]]--
    }
    else if (target < 0) {
      right--
      existedNumToCount[nums[right]]--
    }
    else {

    }
  }

  return results
};
