import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { SampleEdit } from '../SampleEdit'

const getWrapper = (): React.FC => ({ children }) => (
  <Router>{children}</Router>
)

describe('SampleEdit', () => {
  it('should render without errors', () => {
    const wrapper = getWrapper()
    const component = render(<SampleEdit />, { wrapper })
    return expect(component.findByText('Sample Edit')).toBeDefined()
  })
})