import React, { Component } from 'react'
import HeaderLayout from '../src'
import MenuIcon from 'material-ui/IconButton'
import Check from 'material-ui-icons/ChevronLeft'

class App extends Component {

  render = () => (
    <HeaderLayout
      title="Hello World!"
      loading
      operations={[
        {id:'menu', icon:MenuIcon, onClick:() => window.alert('Hello World!')},
        {id:'account', image:'http://reactjspain.com/favicon.ico', right: true, small:true, to:'/account'},
        {id:'check', description:'Save', icon:Check, right:true}
      ]}
    >
      {'Hello World!'}
    </HeaderLayout>
  )

}

export default App