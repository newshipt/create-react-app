import React from 'react'
import { shallow } from 'enzyme'
import SampleEdit from '../SampleEdit'

beforeAll(() => {})

describe('sample/SampleEdit', () => {

  it('should render without errors', () => {
    expect(shallow(<SampleEdit />).contains('Sample Edit')).toBe(true)
  })
})
