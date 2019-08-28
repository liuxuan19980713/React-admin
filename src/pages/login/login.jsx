import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import './login.less'
import logo from './images/logo.png'
class NormalLoginForm extends Component {
  constructor (props) {
    super(props)
    
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // value就是我们表单提交的数据，是一个对象 
      if (!err) {
        console.log('发送ajax请求 ', values);// 发送ajax请求  {username: "ssss", password: "ssssssss"}
      }else{
        console.log('密码或者用户名不正确')
      }
    });
  };
  render () {
    const { getFieldDecorator } = this.props.form;
    return (
    
      <div className='login'>
        <header className='login_header'>
          <img src={logo} alt='' />
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className='login_section'>
          <h1>用户登录</h1>
          <Form onSubmit={this.handleSubmit} className='login-form'>
            <Form.Item>
                {getFieldDecorator('username',{
                  rules:[
                    {required:true,message:'用户名不可以为空'},
                    {min:4,message:'用户名的长度不可以低于4'},
                    {max:12,message:'用户名的长度不可以小于12'}
                  ]
                })(
                  <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='Username'
                />)}
            </Form.Item>
            <Form.Item>
            {getFieldDecorator('password',{
                  rules:[
                    {required:true,message:'密码不可以为空'},
                    {pattern:/[a-zA-Z0-9_]+$/,message:'密码以数字字母下划线组成'}
                  ]
                })( <Input
                  prefix={
                    <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type='password'
                  placeholder='Password'
                />)}
            </Form.Item>
            <Form.Item>
            
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
              >
                登录
              </Button>
        
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}
// Form.create 是高阶函数, WrappedNormalLoginForm是一个高阶组件
// 在这个WrappedNormalLoginForm身上就会多出一个form属性
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm;