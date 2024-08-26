import { expect, it } from 'vitest'
import * as runner from '../index'
import { readEnv } from '@/utils'

readEnv()

const coder = process.env.CODER as keyof typeof runner
const testFunc = runner[coder]

it('case 1', () => {
  expect(testFunc([1, 1, 1], 2)).toBe(2)
})

it('case 2', () => {
  expect(testFunc([1, 2, 3], 3)).toBe(2)
})

it('case 3', () => {

})
