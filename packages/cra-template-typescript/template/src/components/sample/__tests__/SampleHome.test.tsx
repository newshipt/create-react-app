import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { SampleHome } from '../SampleHome'

const getWrapper = (): React.FC => ({ children }) => (
  <Router>{children}</Router>
)

describe('SampleHome', () => {
  it('should render without errors', () => {
    const wrapper = getWrapper()
    const component = render(<SampleHome />, { wrapper })
    return expect(component.findByText('Sample Home')).toBeDefined()
  })
})