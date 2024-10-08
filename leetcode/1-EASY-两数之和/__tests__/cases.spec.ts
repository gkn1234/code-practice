import { expect, it } from 'vitest'
import * as runner from '../index'
import { readEnv } from '@/utils'

readEnv()

const coder = process.env.CODER as keyof typeof runner
const testFunc = runner[coder]

it('case 1', () => {
  expect(testFunc([2, 7, 11, 15], 9)).toEqual([0, 1])
})

it('case 2', () => {
  expect(testFunc([3, 2, 4], 6)).toEqual([1, 2])
})

it('case 3', () => {
  expect(testFunc([3, 3], 6)).toEqual([0, 1])
})
