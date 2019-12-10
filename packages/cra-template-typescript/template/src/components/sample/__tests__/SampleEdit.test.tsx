import React from 'react'
import { render } from '@testing-library/jest-dom'
import { SampleEdit } from '../SampleEdit'

describe('SampleEdit', () => {
  it('should render without errors', () => {
    const component = render(<SampleEdit />)
    return expect(component.findByText('Sample Edit')).toBeDefined()
  })
})