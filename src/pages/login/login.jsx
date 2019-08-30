import React, { Component } from 'react'
import { Form, Icon, Input, Button,message } from 'antd'
import {Redirect} from 'react-router-dom'
import './login.less'
import logo from '../../assets/images/logo.png'
import {reLogin} from '../../api/index.js'
import storageUtils from '../../utils/localStorage.js'
class NormalLoginForm extends Component {
 
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      // value就是我们表单提交的数据，是一个对象 
      if (!err) {
          const {username,password} = values
          // 使用await来优化了promise
           // 如果不加await那么就是response就是一个promise对象，如果加上了await，就表示等待，等到它成功给你返回一个数据的时候
          let result = await reLogin(username,password)
          
        if(result.status===0){
          message.success('登录成功')
          // 将用户的信息存储到本地
          storageUtils.saveUser(result.data)
          // localStorage.setItem('user',JSON.stringify(result.data))
          //跳转到admin页 
          this.props.history.replace('/')
        }else{
          message.error(result.msg)
        }
       
       
        // 使用await请求失败了,应该使用try catch来处理
        // .then(response=>{
        //  console.log(response.data)
        // })
        // .catch(err=>{
        //   console.log('查询失败'+err.message)
        // })
      }else{
        console.log('密码或者用户名不符合规范')
        // console.log('密码或者用户名不正确')
      }
    });
  };
  render () {
    const { getFieldDecorator } = this.props.form;
    const user = storageUtils.getUser()
    if(Object.keys(user).length !==0){
      return <Redirect to="/"></Redirect>
    }

    
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