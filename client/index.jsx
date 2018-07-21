import 'isomorphic-fetch'
import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'

class App extends PureComponent {
  render() {
    return (
      <div>drone test app version 1.3.5</div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))