import React, { Component } from 'react'
import { Card, Button, Icon, Table, Modal, message, Form } from 'antd'
import './category.less'
import AddCategory from './addCategory.jsx'
import EditCategory from './editCategory.jsx'
import { category, updateEditCategory, addCategory } from '../../api/index.js'
class Category extends Component {
  constructor (props) {
    super(props)
    this.state = {
      getCategoryLists: [],
      getSubCategoryLists: [],
      parentId: '0',
      parentName: '',
      visible: 0 // 0 代表不显示，1代表显示添加的modal 2代表显示更新的modal
    }
  }
  // 显示二级分类
  showSubCategory = text => {
    const { parentName } = text
    this.setState(
      {
        parentName,
        parentId: text.parentId
      },
      () => {
        this.getCategoryList()
      }
    )
  }
  // 初始化列数据
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
        render: (category, text) => (
          <span>
            <span
              onClick={() => {
                this.showUpdateModal(text)
              }}
            >
              修改
            </span>
            &nbsp;&nbsp;
            <a
              onClick={() => {
                this.showSubCategory(text)
              }}
            >
              查看子分类
            </a>
          </span>
        ),
        align: 'center',
        width: '33.33%'
      }
    ]
  }
  // 获取一级/二级分类数据
  getCategoryList = async params => {
    const parentId = params || this.state.parentId
    const result = await category(parentId)

    if (parentId === '0') {
      if (result.status === 0) {
        const dataSource = [
          {
            parentId: '0',
            _id: '5c2ed631f352726338607046',
            name: '分类001',
            __v: 0
          },
          {
            parentId: '0',
            _id: '5c2ed647f352726338607047',
            name: '分类2',
            __v: 0
          },
          {
            parentId: '0',
            _id: '5c2ed64cf352726338607048',
            name: '1分类3',
            __v: 0
          }
        ]
        this.setState({
          getCategoryLists: result.data
          // getCategoryLists: dataSource
        })
      } else {
        const datas = [
          {
            parentId: '5c2ed64cf352726338607048',
            _id: '5c2ed65df352726338607049',
            name: '分类3333',
            __v: 0
          },
          {
            parentId: '5c2ed64cf352726338607048',
            _id: '5c2ed66ff35272633860704a',
            name: '分类34',
            __v: 0
          }
        ]
        this.setState({
          getSubCategoryLists: datas
        })
      }
    }
  }
  showAddModal = () => {
    this.setState({
      visible: 1
    })
  }
  showUpdateModal = text => {
    this.text = text
    this.setState({
      visible: 2
    })
  }
  // 点击取消关闭modal
  handleCancel = () => {
    this.setState({
      visible: 0
    })
  }
  // 添加分类
  addCategory = async () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        // 隐藏输入框
        this.setState({
          visible: 0
        })
        // 收集数据
        const { parentId, categoryName } = this.form.getFieldsValue()
        // 发送请求添加数据再重新渲染
        const result = await addCategory(parentId, categoryName)
        if (result.status === 0) {
          message.success('添加成功')
          if (parentId === this.state.parentId) {
            // 表明我添加的是当前分类，所以需要刷新界面
            this.getCategoryList()
          } else if (parentId === '0') {
            // 表明我添加的是一级分类,这个时候不需要显示一级列表，但是需要更新一级列表,继续显示我二级列表
            this.getCategoryList('0')
          }
        } else {
          message.error('添加失败，请重试')
        }
      }else{
        message.error('请正确输入！')
      }
    })
  }
  // 更新分类
  updateCategory = async () => {
    this.setState({
      visible: 0
    })
    // 获取表单中输入的值
    let categoryName = this.value
    let categoryId = this.text._id
    // 发送请求
    const result = await updateEditCategory(categoryName, categoryId)
    if (result.status === 0) {
      message.success('更新成功')
      this.getCategoryList()
    } else {
      message.error('更新失败，请重试!')
    }
  }

  // 为第一次render提供初始化的数据
  componentWillMount () {
    this.initColumns()
  }
  // 执行异步任务
  componentDidMount () {
    this.getCategoryList()
  }

  // 获取修改文本框的值
  getEditValue = value => {
    this.value = value
  }
  render () {
    this.text = this.text ? this.text : {}
    return (
      <div className='category'>
        <Card
          title='一级列表'
          extra={
            <Button
              type='danger'
              onClick={this.showAddModal}
              style={{ backgroundColor: '#1DA57A', border: 'none' }}
            >
              <Icon type='plus' />
              添加
            </Button>
          }
          style={{ width: '100%', height: '100%' }}
        >
          <Table
            dataSource={
              this.state.parentId === '0'
                ? this.state.getCategoryLists
                : this.state.getSubCategoryLists
            }
            bordered
            rowKey='_id'
            pagination={{ pageSize: 5 }}
            //  loading={true}
            columns={this.columns}
          />
          <Modal
            title='添加分类的modal'
            visible={this.state.visible === 1}
            onOk={this.addCategory}
            onCancel={this.handleCancel}
          >
            <AddCategory
              getCategoryLists={this.state.getCategoryLists}
              parentId={this.state.parentId}
              setForm={form => {
                this.form = form
              }}
            />
          </Modal>
          {/* 这里需要获取addCategory表单的form，category的form是获取不到数据的 */}
          <Modal
            title='更新分类的modal'
            visible={this.state.visible === 2}
            onOk={this.updateCategory}
            onCancel={this.handleCancel}
          >
            <EditCategory
              categoryName={this.text.name}
              getEditValue={this.getEditValue}
            />
          </Modal>
        </Card>
      </div>
    )
  }
}
export default Form.create()(Category)
