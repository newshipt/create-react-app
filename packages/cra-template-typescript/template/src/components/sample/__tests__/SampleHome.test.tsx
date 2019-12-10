import React from 'react'
import { render } from '@testing-library/jest-dom'
import { SampleHome } from '../SampleHome'

describe('SampleHome', () => {
  it('should render without errors', () => {
    const component = render(<SampleHome />)
    return expect(component.findByText('Sample Home')).toBeDefined()
  })
})