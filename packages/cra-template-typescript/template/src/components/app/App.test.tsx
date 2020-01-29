import React from 'react'
import { render } from 'test-utils'
import { auth } from '@shipt/sg1'
import { App } from './App'

auth.redirect = jest.fn()

it('renders without errors', () => {
  expect(() => render(<App />)).not.toThrow()
})
