export function moveZeroes(nums: number[]): void {
  const length = nums.length
  let fast = 0
  let slow = 0
  while (fast < length) {
    if (nums[fast] !== 0) {
      nums[slow] = nums[fast]
      slow++
    }
    fast++
  }
  while (slow < length) {
    nums[slow] = 0
    slow++
  }
};
// 这就是双指针嘛，头好痒，要长脑子了
