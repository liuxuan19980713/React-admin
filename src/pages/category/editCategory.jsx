import React, { Component } from 'react'
import { Form, Input } from 'antd'
import ReactTypes from 'prop-types'
// 简化标签
const Item = Form.Item

class EditCategory extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  static propTypes = {
    categoryName:ReactTypes.string,
    getEditValue:ReactTypes.func
  }
  changeHandle = (e)=>{
    this.props.getEditValue(e.target.value)
  }
  render () {
      console.log(this.props.categoryName)
    const { getFieldDecorator } = this.props.form
    const {categoryName} = this.props
    return (
      <Form >     
        <Item>
          <p>分类名称</p>
          {getFieldDecorator('categoryName', {
            initialValue: categoryName,
            rules:[
              {required:true,message:'分类名不可以为空'},
               {min:4,message:'分类名的长度不可以低于4'},
               {max:12,message:'分类名的长度不可以小于12'}
       ]
          })(<Input onChange={this.changeHandle}/>)}
        </Item>
      </Form>
    )
  }
}
export default Form.create({})(EditCategory)
