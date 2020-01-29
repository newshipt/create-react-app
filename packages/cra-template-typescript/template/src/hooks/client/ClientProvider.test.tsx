import React from 'react'
import { render } from 'test-utils'
import { ClientProvider } from './ClientProvider'

it('renders without errors', () => {
  expect(() => render(<ClientProvider />)).not.toThrow()
})
