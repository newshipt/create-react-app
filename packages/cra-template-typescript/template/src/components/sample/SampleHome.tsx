import React from 'react'
import { Link } from 'react-router-dom'

const MudOwl = (props: any) => <img
  alt="Mud Owl"
  style={{ maxWidth: '500px' }}
  src={"https://i.pinimg.com/originals/b2/df/6c/b2df6cb6ba1c2585dc3dd924012bf0cb.jpg"}
  {...props}
/>

export const SampleHome: React.FC = () => {
  const [mudOwls, setMudOwls] = React.useState<typeof MudOwl[]>([])
  
  const addMudOwl = React.useCallback(() => {
    setMudOwls([
      ...mudOwls,
      MudOwl
    ])
  }, [mudOwls, setMudOwls])

  return (
    <section>
      <h3>Sample Home</h3>
      <button onClick={addMudOwl}>Count {mudOwls.length}</button>
      <br />
      <Link to="/sample/edit">Edit</Link>
      <br />
      <div style={{ width: '100%', overflowY: 'scroll' }}>
        {mudOwls.map((MudOwl, i) => (
          <MudOwl key={i} />
        ))}
      </div>
    </section>
  )
}
