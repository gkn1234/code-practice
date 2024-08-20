import { expect, it } from 'vitest'
import * as runner from '../index'
import { readEnv } from '@/utils'

readEnv()

const coder = process.env.CODER as keyof typeof runner
const testFunc = runner[coder]

it('case 1', () => {
  expect(testFunc([100, 4, 200, 1, 3, 2])).toBe(4)
})

it('case 2', () => {
  expect(testFunc([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])).toBe(9)
})
