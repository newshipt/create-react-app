import React from 'react'
import { shallow } from 'enzyme'
import SampleHome from '../SampleHome'

beforeAll(() => {})

describe('sample/SampleHome', () => {

  it('should have component id', () => {
    expect(SampleHome.id).toBe('SampleHome')
  })

  it('should render without errors', () => {
    expect(shallow(<SampleHome />).contains('Sample Home')).toBe(true)
  })
})
