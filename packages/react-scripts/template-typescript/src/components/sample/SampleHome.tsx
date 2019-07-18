import React from 'react'
import { Link } from 'react-router-dom'
import { ComponentBase } from '@shipt/nova'

const MudOwl = (props: any) => <img
  alt="Mud Owl"
  style={{ maxWidth: '500px' }}
  src={"https://i.pinimg.com/originals/b2/df/6c/b2df6cb6ba1c2585dc3dd924012bf0cb.jpg"}
  {...props}
/>

interface SampleProps {
  history: any
  location: any
}

export default class SampleHome extends ComponentBase<SampleProps> {
  static id = 'SampleHome'

  state = {
    counter: 1,
    mudOwls: [MudOwl]
  }

  constructor(props: SampleProps) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    const mudOwls = this.state.mudOwls
    mudOwls.push(MudOwl)
    this.setState({
      counter: this.state.counter + 1,
      mudOwls
    })
  }

  render() {
    const { history, location } = this.props
    return (
      <section>
        <h3>Sample Home</h3>
        <button onClick={this.onClick}>Count {this.state.counter}</button>
        <br />
        <Link to="/sample/edit">Edit</Link>
        <br />
        <div style={{ width: '100%', overflowY: 'scroll' }}>
          {this.state.mudOwls.map((MudOwl, i) => (
            <MudOwl key={i} />
          ))}
        </div>
      </section>
    )
  }
}