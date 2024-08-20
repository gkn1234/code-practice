import { expect, it } from 'vitest'
import * as runner from '../index'
import { readEnv } from '@/utils'

readEnv()

const coder = process.env.CODER as keyof typeof runner
const originTestFunc = runner[coder]

function sort(arr: string[][]) {
  const res = arr
  res.forEach((arr) => {
    arr.sort((a, b) => a.localeCompare(b))
  })
  return res.sort((a, b) => {
    const ld = a.length - b.length
    if (ld !== 0) {
      return ld
    }

    return a[0].localeCompare(b[0])
  })
}
const testFunc: typeof originTestFunc = (...args) => {
  const res = originTestFunc(...args)
  return sort(res)
}

it('case 1', () => {
  expect(testFunc(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])).toEqual([['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']])
})

it('case 2', () => {
  expect(testFunc(['a'])).toEqual([['a']])
})

it('case 3', () => {
  expect(testFunc([''])).toEqual([['']])
})
