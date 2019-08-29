import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import ReactTypes from 'prop-types'
import Login from './pages/login/login.jsx';
import Admin from './pages/admin/admin.jsx';
export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render () {
    return (
      
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' component={Admin} />
        </Switch>
      </BrowserRouter>
    )
  }
}
