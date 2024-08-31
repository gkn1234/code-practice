import { expect, it } from 'vitest'
import * as runner from '../index'
import { readEnv } from '@/utils'

readEnv()

const coder = process.env.CODER as keyof typeof runner
const testFunc = runner[coder]

it('case 1', () => {
  expect(testFunc([-1, 0, 1, 2, -1, -4])).toEqual([[-1, -1, 2], [-1, 0, 1]])
})

it('case 2', () => {
  expect(testFunc([0, 1, 1])).toEqual([])
})

it('case 3', () => {
  expect(testFunc([0, 0, 0])).toEqual([[0, 0, 0]])
})
