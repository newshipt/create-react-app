import React from 'react'
import { shallow } from 'enzyme'
import SampleDefault from '../SampleDefault'

beforeAll(() => {})

describe('sample/SampleDefault', () => {

  it('should have component id', () => {
    expect(SampleDefault.id).toBe('SampleDefault')
  })

  it('should render without errors', () => {
    expect(shallow(<SampleDefault />).contains('Sample Default')).toBe(true)
  })
})
