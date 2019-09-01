import React, { Component } from 'react'
import './header.less'
// import { weather } from '../../api/index.js'
import { withRouter } from 'react-router-dom'
import storageLocal from '../../utils/localStorage.js'
import { formatDate } from '../../utils/formatDate.js'
import menuList from '../../config/menuConfig.js'
import { Modal,Button } from 'antd';
const { confirm } = Modal;
class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentTime: formatDate(new Date())
    }
  }
  UNSAFE_componentWillMount () {
    this.data = storageLocal.getUser()
  }
  // 在组件完成挂载的钩子函数中写我们的异步代码
  componentDidMount () {
    this.timeId = setInterval(()=>{
      const currentTime = formatDate(new Date())
      this.setState({currentTime})
    },1000)
  }
  // 组件将要被卸载的时候清理定时器
  componentWillUnmount(){
    clearInterval(this.timeId)
  }
  // 退出功能
   showConfirm=()=> {
     const history = this.props.history
    confirm({
      title: '确定要退出登录吗',
      content: '确定点击确定,否则点击取消',
      onOk() {
        storageLocal.removeUser()
        history.replace('/login')
     
      },
      onCancel() {},
    });
  }
  render () {
    // 获取当前hash对应的title
    const pathname = this.props.location.pathname
    let title = null
    menuList.forEach(item => {
      if (item.children) {
        return item.children.find(cItem => {
          if (cItem.key === pathname) {
            title = cItem
          }
        })
      }else if (item.key === pathname) {
        title = item
      }else{
        title={title:'首页'}
      }
    })
    const { currentTime } = this.state
    return (
      <div className='headerAdmin'>
        <div className='headerAdmin-top'>
          <span>欢迎,{this.data.username}</span>
          <Button className='exit' onClick={this.showConfirm} type="danger">退出</Button>
        </div>
        <div className='headerAdmin-bottom'>
          <div className='headerAdmin-bottom-left'>{title.title}</div>
          <div className='headerAdmin-bottom-right'>
            <span>{currentTime}</span>
            <img
              src='http://api.map.baidu.com/images/weather/day/qing.png'
              alt=''
            />
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
