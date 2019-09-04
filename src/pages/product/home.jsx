import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Table, Select, Input, Card, Button, Icon, message } from 'antd'
import './home.less'
import { getGoodsList, getSearchList,updateStatus } from '../../api/index.js'

const Options = Select.Option
class ProductHome extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pageNum: 1,
      pageSize: 2,
      goodsList: [],
      isLoading: false,
      searchName: '', // 搜索的关键字
      searchType: 'productName' // 搜索的类型
    }
  }
// 初始化列数据
  initCounts = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        width: '20%'
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        width: '60%'
      },
      {
        title: '价格',
        dataIndex: 'price',
        align: 'center',
        render: price => '￥' + price,
        width: '5%'
      },
      {
        title: '状态',
        dataIndex: 'status',
        align: 'center',
        width: '10%',
        render: (category,text) => ( 
          <span>
         
            <Button type='danger' onClick={()=>{this.changeStatus(text)}}>{text.status===1?'下架':'上架'}</Button>
            <span>{text.status===1?'在售':'已下架'}</span>
          </span>
        )
      },
      {
        title: '操作',
        align: 'center',
        width: '5%',
        render: (category, text) => (
          <span>
            <span onClick={()=>{this.props.history.push('/product/addupdate',category)}}>修改</span>

            <span onClick={()=>{this.props.history.push('/product/detail',category)}}>详情</span>
          </span>
        )
      }
    ]
  }
  changeStatus= async (text)=>{
    const {categoryId,status} = text
    let result 
    if(status===1){
      // 说明需要下架操作
      result = await updateStatus(categoryId,2)
     if(result.status===0){
       // 更新成功厚重新刷新界面
        // this.getGoodsList()
        message.success('更新成功22222')
     }else{
       message.error('更新失败')
     }

    }else{
      // 需要上架操作
      result = await updateStatus(categoryId,1)
      if(result.status===0){
        // 更新成功厚重新刷新界面
         // this.getGoodsList()
         message.success('更新成功11111')
      }else{
        message.error('更新失败')
      }
    }
  }
  // 获取列表数据
  getGoodsList = async (pageNum, pageSize) => {
    this.setState({
      isLoading: true
    })
    const result = await getGoodsList(pageNum, pageSize)
    if (result.status === 0) {
      message.success('获取列表数据成功')
      const dataSource = [
        {
          status: 1,
          imgs: ['image-1559402396338.jpg'],
          _id: '5ca9e05db49ef916541160cd',
          name: '联想ThinkPad 翼4809',
          desc: '年度重量级新品，X390、T490全新登场 更加轻薄机身设计9',
          price: 65999,
          pCategoryId: '5ca9d6c0b49ef916541160bb',
          categoryId: '5ca9db9fb49ef916541160cc',
          detail:
            '<p><span style="color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span> 222</p>\n<p><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;">99999</span></p>\n',
          __v: 0
        },
        {
          status: 1,
          imgs: ['image-1559402448049.jpg', 'image-1559402450480.jpg'],
          _id: '5ca9e414b49ef916541160ce',
          name: '华硕(ASUS) 飞行堡垒',
          desc:
            '15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)',
          price: 6799,
          pCategoryId: '5ca9d6c0b49ef916541160bb',
          categoryId: '5ca9db8ab49ef916541160cb',
          detail:
            '<p><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;">华硕(ASUS) 飞行堡垒6 15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)火陨红黑</span>&nbsp;</p>\n<p><span style="color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;">【4.6-4.7号华硕集体放价，大牌够品质！】1T+256G高速存储组合！超窄边框视野无阻，强劲散热一键启动！</span>&nbsp;</p>\n',
          __v: 0
        },
        {
          status: 2,
          imgs: ['image-1559402436395.jpg'],
          _id: '5ca9e4b7b49ef916541160cf',
          name: '你不知道的JS（上卷）',
          desc:
            "图灵程序设计丛书： [You Don't Know JS:Scope & Closures] JavaScript开发经典入门图书 打通JavaScript的任督二脉",
          price: 35,
          pCategoryId: '0',
          categoryId: '5ca9d6c9b49ef916541160bc',
          detail:
            '<p style="text-align:start;"><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;">图灵程序设计丛书：你不知道的JavaScript（上卷）</span> <span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;"><strong>[You Don\'t Know JS:Scope &amp; Closures]</strong></span></p>\n<p style="text-align:start;"><span style="color: rgb(227,57,60);background-color: rgb(255,255,255);font-size: 12px;">JavaScript开发经典入门图书 打通JavaScript的任督二脉 领略语言内部的绝美风光</span>&nbsp;</p>\n',
          __v: 0
        },
        {
          status: 2,
          imgs: ['image-1554638240202.jpg'],
          _id: '5ca9e5bbb49ef916541160d0',
          name: '美的(Midea) 213升-BCD-213TM',
          desc:
            '爆款直降!大容量三口之家优选! *节能养鲜,自动低温补偿,36分贝静音呵护',
          price: 1388,
          pCategoryId: '5ca9d695b49ef916541160ba',
          categoryId: '5ca9d9cfb49ef916541160c4',
          detail:
            '<p style="text-align:start;"><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, "microsoft yahei;">美的(Midea) 213升 节能静音家用三门小冰箱 阳光米 BCD-213TM(E)</span></p>\n<p><span style="color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;font-family: tahoma, arial, "Microsoft YaHei", "Hiragino Sans GB", u5b8bu4f53, sans-serif;">【4.8美的大牌秒杀日】爆款直降!大容量三口之家优选! *节能养鲜,自动低温补偿,36分贝静音呵护! *每天不到一度电,省钱又省心!</span>&nbsp;</p>\n',
          __v: 0
        },
        {
          status: 1,
          imgs: ['image-1554638403550.jpg'],
          _id: '5ca9e653b49ef916541160d1',
          name: '美的（Midea）KFR-35GW/WDAA3',
          desc: '正1.5匹 变频 智弧 冷暖 智能壁挂式卧室空调挂机',
          price: 2499,
          pCategoryId: '5ca9d695b49ef916541160ba',
          categoryId: '5ca9da1ab49ef916541160c6',
          detail:
            '<p style="text-align:start;"><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;">美的（Midea）正1.5匹 变频 智弧 冷暖 智能壁挂式卧室空调挂机 KFR-35GW/WDAA3@</span></p>\n<p style="text-align:start;"></p>\n<p><span style="color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;">【4.8美的大牌秒杀日】提前加入购物车！2299元成交价！前50名下单送赠品加湿型电风扇，赠完即止！8日0点开抢！</span><a href="https://sale.jd.com/mall/LKHdqZUIYk.html" target="_blank"><span style="color: rgb(94,105,173);background-color: rgb(255,255,255);font-size: 12px;">更有无风感柜挂组合套购立减500元！猛戳！！</span></a>&nbsp;</p>\n',
          __v: 0
        }
      ]

      this.setState({
        goodsList: dataSource,
        isLoading: false
      })
    }
  }
  // 搜索
  search = async () => {
    const { searchType, searchName, pageNum, pageSize } = this.state
    const result = await getSearchList({
      pageNum,
      pageSize,
      searchType,
      searchName
    })
    if (result.status === 0) {
      this.setState({
        isLoading: true
      })
      message.success('搜索成功')
      const data = [
        {
          status: 1,
          imgs: ['image-1559402396338.jpg'],
          _id: '5ca9e05db49ef916541160cd',
          name: '联想ThinkPad 翼4809',
          desc: '年度重量级新品，X390、T490全新登场 更加轻薄机身设计9',
          price: 65999,
          pCategoryId: '5ca9d6c0b49ef916541160bb',
          categoryId: '5ca9db9fb49ef916541160cc',
          detail:
            '<p><span style="color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span> 222</p>\n<p><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;">99999</span></p>\n',
          __v: 0
        },
        {
          status: 2,
          imgs: ['image-1554638240202.jpg'],
          _id: '5ca9e5bbb49ef916541160d0',
          name: '美的(Midea) 213升-BCD-213TM',
          desc:
            '爆款直降!大容量三口之家优选! *节能养鲜,自动低温补偿,36分贝静音呵护',
          price: 1388,
          pCategoryId: '5ca9d695b49ef916541160ba',
          categoryId: '5ca9d9cfb49ef916541160c4',
          detail:
            '<p style="text-align:start;"><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, "microsoft yahei;">美的(Midea) 213升 节能静音家用三门小冰箱 阳光米 BCD-213TM(E)</span></p>\n<p><span style="color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;font-family: tahoma, arial, "Microsoft YaHei", "Hiragino Sans GB", u5b8bu4f53, sans-serif;">【4.8美的大牌秒杀日】爆款直降!大容量三口之家优选! *节能养鲜,自动低温补偿,36分贝静音呵护! *每天不到一度电,省钱又省心!</span>&nbsp;</p>\n',
          __v: 0
        },
        {
          status: 1,
          imgs: ['image-1554638676149.jpg', 'image-1554638683746.jpg'],
          _id: '5ca9e773b49ef916541160d2',
          name: '联想ThinkPad X1 Carbon',
          desc:
            '英特尔酷睿i5 14英寸轻薄笔记本电脑（i5-8250U 8G 256GSSD FHD）黑色',
          price: 9999,
          pCategoryId: '5ca9d6c0b49ef916541160bb',
          categoryId: '5ca9db78b49ef916541160ca',
          detail:
            '<p style="text-align:start;"><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, "microsoft yahei;">联想ThinkPad X1 Carbon 2018（09CD）英特尔酷睿i5 14英寸轻薄笔记本电脑（i5-8250U 8G 256GSSD FHD）黑色</span></p>\n<p><span style="color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;font-family: tahoma, arial, "Microsoft YaHei", "Hiragino Sans GB", u5b8bu4f53, sans-serif;">年度重量级新品，X390、T490全新登场 更加轻薄机身设计，全面的配置升级，让工作更便捷，让生活更轻松</span><a href="https://pro.jd.com/mall/active/2M4o7NTzHH6jEJXS7VbpbTAANQB9/index.html" target="_blank"><span style="color: rgb(94,105,173);background-color: rgb(255,255,255);font-size: 12px;font-family: tahoma, arial, "Microsoft YaHei", "Hiragino Sans GB", u5b8bu4f53, sans-serif;">4月9日京东震撼首发，火爆预约</span></a>&nbsp;</p>\n',
          __v: 0
        }
      ]
        this.setState({
          goodsList:data,
          isLoading:false
        })
    }
  }
  componentWillMount () {
    this.initCounts()
  }
  componentDidMount () {
    this.getGoodsList(this.state.pageNum, this.state.pageSize)
  }
  render () {
    const { searchType, searchName } = this.state
    const title = (
      <div>
        {/* 获取搜索的类型 */}
        <Select
          value={searchType}
          style={{ width: 150 }}
          onChange={value => {
            this.setState({
              searchType: value
            })
          }}
        >
          <Options value='productName'>按名称搜索</Options>
          <Options value='productDesc'>按分类搜索</Options>
        </Select>
        <Input
        // 获取搜索的关键字
          style={{ width: 200, margin: '0 20px' }}
          value={searchName}
          onChange={e => {
            this.setState({
              searchName: e.target.value
            })
          }}
        />
        <Button type='primary' onClick={this.search}>
          搜索
        </Button>
      </div>
    )
    const extra = (
      <Button type='primary' onClick={()=>{this.props.history.push('/product/addupdate')}}>
        <Icon type='plus' />
        添加商品
      </Button>
    )
    return (
      <Card
        title={title}
        extra={extra}
        style={{ width: '100%', height: '100%', fontSize: 14 }}
      >
        <Table
          dataSource={this.state.goodsList}
          columns={this.columns}
          bordered
          rowKey='_id'
          loading={this.state.isLoading}
          pagination={{ pageSize: this.state.pageSize }}
        />
      </Card>
    )
  }
}

export default withRouter(ProductHome)