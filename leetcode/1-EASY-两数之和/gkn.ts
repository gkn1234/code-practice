export function twoSum(nums: number[], target: number): number[] {
  // 为了一次遍历内完成，使用哈希表存储已遍历的数字

  /**
   * 哈希表
   * @key 已遍历的数字
   * @value 该数字在原列表中的索引
   */
  const existedNumToIndex: Record<number, number> = {}

  for (const [index, num] of nums.entries()) {
    const targetNum = target - num

    // 如果哈希表中存在目标数字，则返回其索引和当前数字的索引
    if (existedNumToIndex[targetNum] !== undefined) {
      return [existedNumToIndex[targetNum], index]
    }
    else {
      existedNumToIndex[num] = index
    }
  }

  return []
}
