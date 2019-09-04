import React, { Component } from 'react'
import { Card, Icon, List, message } from 'antd'
import './detail.less'
import {getCategoryById} from '../../api/index.js'
export default class ProductDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      categoryName:'',
      pCategoryName:''
    }
  }
  async componentDidMount(){
    const {categoryId,pcategoryId}  = this.props.location.state
    // 根据id获取对应的数据
  //  const result1 = await getCategoryById(categoryId)
  //  const result2 = await getCategoryById(pcategoryId)
   const result = await Promise.all([getCategoryById(categoryId),getCategoryById(pcategoryId)])
    if(result.length!==0){
      this.setState({
        categoryName:'电脑',
        pCategoryName:'家电'
      })
    }else{
      message.error('获取失败')
    }
   
  }
  render () {
    const {name,desc,detail,price,imgs} = this.props.location.state
    const {categoryName,pCategoryName} = this.state
    const title = (
      <div>
        <Icon type='arrow-left' style={{ marginRight: 15 }} onClick={()=>{this.props.history.replace('/product')}}/>
        <span>商品详情</span>
      </div>
    )
    return (
      <Card title={title} style={{ width: '100%' }}>
        <List>
          <List.Item>
            <span className="goods">商品名称:</span>
            <span>{name}</span>
          </List.Item>
          <List.Item>
            <span  className="goods">商品描述:</span>
            <span >{desc}</span>
          </List.Item>
          <List.Item>
            <span  className="goods">商品价格:</span>
            <span style={{color:'red'}}>￥{price}</span>
          </List.Item>
          <List.Item>
            <span  className="goods">商品分类:</span>
            <span>{pCategoryName}-->{categoryName}</span>
          </List.Item>
          <List.Item>
            <span  className="goods" >商品图片:</span>
            <span>
              {/* {imgs.map((item,i)=>{
                return <img src="https://www.baidu.com/s?wd=angelababy&usm=2&ie=utf-8&rsv_cq=%E5%9B%BE%E7%89%87&rsv_dl=0_right_recommends_merge_20826&euri=1513794" alt="" key={i}/>
              })} */}
              <img className="imgs" src="/0.png" alt="" />
              <img className="imgs" src="/1.png" alt="" />
            </span>
          </List.Item>
          <List.Item>
            <span  className="goods">商品详情:</span>
            <span dangerouslySetInnerHTML={{__html:detail}}></span>
          </List.Item>
        </List>
      </Card>
    )
  }
}
