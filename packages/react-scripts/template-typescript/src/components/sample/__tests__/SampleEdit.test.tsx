import React from 'react'
import { shallow } from 'enzyme'
import SampleEdit from '../SampleEdit'

beforeAll(() => {})

describe('sample/SampleEdit', () => {

  it('should have component id', () => {
    expect(SampleEdit.id).toBe('SampleEdit')
  })

  it('should render without errors', () => {
    expect(shallow(<SampleEdit />).contains('Edit')).toBe(true)
  })
})
