import { expect, it } from 'vitest'
import * as runner from '../index'
import { readEnv } from '@/utils'

readEnv()

const coder = process.env.CODER as keyof typeof runner
const testFunc = runner[coder]

it('case 1', () => {
  
})

it('case 2', () => {
  
})

it('case 3', () => {
  
})
