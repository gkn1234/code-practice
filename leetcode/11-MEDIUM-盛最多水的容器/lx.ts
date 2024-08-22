export function maxArea(height: number[]): number {
  let maxArea = 0
  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      const area = Math.min(height[i], height[j]) * (j - i)
      maxArea = Math.max(maxArea, area)
    }
  }
  return maxArea
}
// 暴力解法，超时，需要知道如何使用双指针进行解答
