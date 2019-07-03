import React from 'react'
import { ComponentBase } from '@shipt/nova'

export default class SampleDefault extends ComponentBase {
    static id = 'SampleDefault'

    state = {
        counter: 1
    }

    constructor(props: any) {
        super(props)
        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        this.setState({ counter: this.state.counter + 1 })
    }

    render() {
        return (
            <section className="mw5 mw7-ns center bg-light-gray pa3 ph5-ns">
                <h3 className="f2 measure">Sample Default</h3>
                <button onClick={this.onClick}>Count {this.state.counter}</button>
            </section>
        )
    }
}