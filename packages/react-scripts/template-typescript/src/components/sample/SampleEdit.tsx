import React from 'react'
import { ComponentBase } from '@shipt/nova'

export default class SampleEdit extends ComponentBase {
    static id = 'SampleEdit'
    render() {
        return (
            <div>
                <h1>Edit</h1>
                <div className="form">
                    <div className="form-group">
                        <label>Sample Name</label>
                        <input type="text" className="form-control" name="Sample" />
                    </div>
                </div>
            </div>
        )
    }
}