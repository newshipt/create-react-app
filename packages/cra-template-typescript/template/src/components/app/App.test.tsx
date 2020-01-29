import React from 'react'
import { auth } from '@shipt/sg1'
import { render } from 'test-utils'
import { App } from './App'

auth.redirect = jest.fn()

it('renders without errors', () => {
  expect(() => render(<App />)).not.toThrow()
})
