import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ProductHome from './home.jsx'
import ProductAddUpdate from './add-update.jsx'
import ProductDetail from './detail.jsx'
export default class Product extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div style={{}}>
        <Switch>
          <Route path='/product/addupdate'  component={ProductAddUpdate} />
          <Route path='/product' exact component={ProductHome}  />
          <Route path='/product/detail' exact  component={ProductDetail} />
          <Redirect to='/product' />
        </Switch>
      </div>
    )
  }
}
