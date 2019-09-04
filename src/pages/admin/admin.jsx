import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import storageUtils from '../../utils/localStorage.js'
import { Layout } from 'antd'
import LeftNav from '../../components/leftNav/leftNav.jsx'
import Header from '../../components/header/header.jsx'

import Home from '../home/home.jsx'
import Category from '../category/category.jsx'
import User from '../user/user.jsx'
import Role from '../role/role.jsx'
import Product from '../product/product.jsx'
import Line from '../charts/line.jsx'
import Bar from '../charts/bar.jsx'
import Pie from '../charts/pie.jsx'

const { Footer, Sider, Content } = Layout
export default class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const user = storageUtils.getUser()
    if (Object.keys(user).length === 0) {
      return <Redirect to='/login' />
    }
    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content style={{margin:20,backgroundColor:'#fff'}}>
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/category' component={Category} />
              <Route path='/product' component={Product} />
              <Route path='/role' component={Role} />
              <Route path='/user' component={User} />
              <Route path='/charts/bar' component={Bar} />
              <Route path='/charts/line' component={Line} />
              <Route path='/charts/pie' component={Pie} />
              <Redirect to='/home' />
            </Switch>
          </Content>
          <Footer>84 2019年9月4日14:50:29</Footer>
        </Layout>
      </Layout>
    )
  }
}
