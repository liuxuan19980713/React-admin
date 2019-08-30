import React, { Component } from 'react'
import './leftNav.less'
import { Link ,withRouter} from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { Menu, Icon } from 'antd'
import menuList from '../../config/menuConfig.js'
const { SubMenu } = Menu

class LeftNav extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  // 渲染左侧导航栏的方法
  renderNav = arrs => {
    return arrs.map((item, i) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
       const cItem =  item.children.find(cItem=>cItem.key===this.props.location.pathname)
       if(cItem){
         this.openKey = item.key
       }
        return (
          <SubMenu
            key={item.key}
            
            title={
                  <span>
                      <Icon type={item.icon} />
                      <span>{item.title}</span>
 
                  </span>
                 }
            >
              { this.renderNav(item.children)}
            </SubMenu>
        )
      }
    })
  }
  UNSAFE_componentWillMount(){
    {this.data = this.renderNav(menuList)}
  }
  render () {
   
    return (
      <div className='leftNav'>
        <Link className='leftNav-header' to='/'>
          <img src={logo} alt='logo' />
          <h2>React项目后台</h2>
        </Link>

        <Menu
          selectedKeys={[this.props.location.pathname]}
          defaultOpenKeys={[this.openKey]}
          mode='inline'
          theme='dark'
        >
          {this.data}
        </Menu>
      </div>
    )
  }
}
// 高阶函数
export default withRouter(LeftNav)
