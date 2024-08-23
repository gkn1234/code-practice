import { expect, it } from 'vitest'
import * as runner from '../index'
import { readEnv } from '@/utils'

readEnv()

const coder = process.env.CODER as keyof typeof runner
const testFunc = runner[coder]

it('case 1', () => {
  expect(testFunc([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49)
})

it('case 2', () => {
  expect(testFunc([1, 1])).toBe(1)
})
