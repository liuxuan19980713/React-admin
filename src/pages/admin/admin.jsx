import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import storageUtils from '../../utils/localStorage.js'
export default class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
      const user = storageUtils.getUser()
      if(Object.keys(user).length ===0){
        return <Redirect to="/login"></Redirect>
      }
    return (
      <div>
        <h1>hello {user.username}</h1>
      </div>
    )
  }
}
