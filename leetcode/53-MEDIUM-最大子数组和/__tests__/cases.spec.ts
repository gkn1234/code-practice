import { expect, it } from 'vitest'
import * as runner from '../index'
import { readEnv } from '@/utils'

readEnv()

const coder = process.env.CODER as keyof typeof runner
const testFunc = runner[coder]

it('case 1', () => {
  expect(testFunc([-2,1,-3,4,-1,2,1,-5,4])).toBe(6)
})

it('case 2', () => {
  expect(testFunc([1])).toBe(1)
})

it('case 3', () => {
  expect(testFunc([5,4,-1,7,8])).toBe(23)
})
