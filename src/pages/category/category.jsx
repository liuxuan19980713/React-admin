import React, { Component } from 'react'
import { Card, Button, Icon, Table } from 'antd'
import './category.less'
import { category,addCategory } from '../../api/index.js'
export default class Category extends Component {
  constructor (props) {
    super(props)
    this.state = {
      getCategoryLists: [],
      getSubCategoryLists: [],
      parentId:'0',
      parentName:''
    }
  }
  showSubCategory = (text)=>{
    console.log(text)
   const {parentName} = text
  console.log(text.parentId)
   this.setState({
    parentName,
    parentId:text.parentId
   },()=>{
      this.getCategoryList()
   })
  }
  initColumns = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '操作',
        dataIndex: 'age',
        key: 'age',
        render: (category,text) => (
          <span>
            <a>修改</a>&nbsp;&nbsp;<a onClick={()=>{this.showSubCategory(text)}}>查看子分类</a>
          </span>
        ),
        align: 'center',
        width: '33.33%'
      }
    ]
  }
  // 获取分类数据
  getCategoryList = async () => {
    const {parentId}  = this.state
    const result =  await category(parentId)
    if(parentId==='0'){
      if(result.status===0){
        const dataSource = [
          {
            "parentId": "0",
            "_id": "5c2ed631f352726338607046",
            "name": "分类001",
            "__v": 0
          },
          {
            "parentId": "0",
            "_id": "5c2ed647f352726338607047",
            "name": "分类2",
            "__v": 0
          },
          {
            "parentId": "0",
            "_id": "5c2ed64cf352726338607048",
            "name": "1分类3",
            "__v": 0
          }
        ]
        this.setState({
          // getCategoryLists:result.data
          getCategoryLists:dataSource
         })
       }else{
        const datas = [
          {
            "parentId": "5c2ed64cf352726338607048",
            "_id": "5c2ed65df352726338607049",
            "name": "分类3333",
            "__v": 0
          },
          {
            "parentId": "5c2ed64cf352726338607048",
            "_id": "5c2ed66ff35272633860704a",
            "name": "分类34",
            "__v": 0
          }
        ]
        this.setState({  
          getSubCategoryLists:datas
         })
       }
    }
   
  }
  // 添加分类
  addCategory = ()=>{

  }
  // 为第一次render提供初始化的数据
  componentWillMount () {
    this.initColumns()
  }
  // 执行异步任务
  componentDidMount () {
    this.getCategoryList()
  }
  render () {
    return (
      <div className='category'>
        <Card
          title='一级列表'
          extra={
            <Button
              type='danger'
              onClick={this.addCategory}
              style={{ backgroundColor: '#1DA57A', border: 'none' }}
            >
              <Icon type='plus' />
              添加
            </Button>
          }
          style={{ width: '100%', height: '100%' }}
        >
          <Table
           dataSource={this.state.parentId==='0'?this.state.getCategoryLists:this.state.getSubCategoryLists}
            bordered 
           
            columns={this.columns} />
        </Card>
      </div>
    )
  }
}
