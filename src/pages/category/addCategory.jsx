import React, { Component } from 'react'
import { Form, Input, Select } from 'antd'
import ReactTypes from 'prop-types'
// 简化标签
const Item = Form.Item
const Option = Select.Option
class AddCategory extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  static propTypes = {
    getCategoryLists:ReactTypes.array.isRequired,
    setForm:ReactTypes.func.isRequired
  }
  componentDidMount(){
    this.props.setForm(this.props.form)
  }
  render () {
    const { getFieldDecorator } = this.props.form
    
    const {getCategoryLists,parentId} = this.props
    return (
      <Form className='login-form'>
        <Item>
          <p>分类类别</p>
          {getFieldDecorator('parentId', {
            initialValue: parentId,
          })(
            //   select不要包裹，否则initialValue不起作用
            <Select> 
              <Option value='0'>一级分类</Option>
              {getCategoryLists.map((item)=>{
                return <Option value={item._id} key={item._id}>{item.name}</Option>
              })}
            </Select>
          )}
        </Item>
        <Item>
          <p>分类名称</p>
          {getFieldDecorator('categoryName',{
            rules:[
                   {required:true,message:'分类名不可以为空'},
                    {min:4,message:'分类名的长度不可以低于4'},
                    {max:12,message:'分类名的长度不可以小于12'}
            ]
          })(<Input placeholder='请输入分类名称' />)}
        </Item>
      </Form>
    )
  }
}
export default Form.create({})(AddCategory)
