import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import { auth } from '@shipt/sg1'
import { render } from '@testing-library/react'
import { App } from './App'

auth.redirect = jest.fn()

const getWrapper = (): React.FC => ({ children }) => <Router>{children}</Router>

it('renders without errors', () => {
  const wrapper = getWrapper()
  expect(() => render(<App />, { wrapper })).not.toThrow()
})
