import React from 'react'
import { ComponentBase } from '@shipt/nova'

export default class SampleEdit extends ComponentBase {
  static id = 'SampleEdit'
  render() {
    return (
      <div>
        <h3>Sample Edit</h3>
        <div>
          <label>Sample Name</label>
          <input type="text" name="Sample" />
        </div>
      </div>
    )
  }
}