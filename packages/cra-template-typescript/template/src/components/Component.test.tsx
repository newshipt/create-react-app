import React from 'react'
import { render } from '@testing-library/react'
import { Component } from './Component'

it('renders without errors', () => {
  const component = render(<Component />)
  expect(component.queryByTestId('title')).toBeDefined()
})
