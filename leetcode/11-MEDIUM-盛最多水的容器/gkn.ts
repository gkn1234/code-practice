export function maxArea(height: number[]): number {
  // 双指针初始从两端开始
  let left = 0
  let right = height.length - 1
  let result = 0
  while (left < right) {
    const area = (right - left) * Math.min(height[left], height[right])
    result = Math.max(area, result)

    // 应该移动数字较小的指针，因为容纳的水量是由
    // 两个指针指向的数字中较小值 ∗ 指针之间的距离 决定的
    if (height[left] < height[right]) {
      left++
    }
    else {
      right--
    }
  }
  return result
};
