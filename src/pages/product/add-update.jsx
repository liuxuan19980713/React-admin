import React, { Component } from 'react'
import { Form, Input, Button, Icon, Card, message, Cascader } from 'antd'
import { category, getCategoryById } from '../../api/index.js'
import PicturesWall from './upload.jsx'
import resultHandle from '../../config/result.js'
import RichTextEditor from './richTextEditor.jsx'
const { TextArea } = Input
class ProductAddUpdate extends Component {
  constructor (props) {
    super(props)
    this.myRef = React.createRef()
    this.rich = React.createRef()
    this.state = {
      options: [],
      isLoading: false
    }
  }
  // 处理提交的请求
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, value) => {
      if (!err) {
        // console.log(value) // value是所有的填写的数据
        // 在这里发生ajax请求来添加数据

        const picW = this.myRef.current
        console.log(value)
        const editorValue = this.rich.current
        // 搜集上传的图片
        const imgs = picW.getImgs()
        // 搜集富文本编辑器输入的内容
        const richText = editorValue.getEditValue()
        message.success('success')
        this.props.history.replace('/product')

      } else {
        message.error('表单必须全部输入不可以为空')
      }
    })
  }
  onChange = (value, selectedOptions) => {
    // value是_id ,selectedOptions是我当前选中的这一项
    // console.log(value, selectedOptions);
  }
  componentWillMount () {
    this.product = this.props.location.state || {}
    // 获取当前商品的id和父id
    const { categoryId, pCategoryId } = this.product
    this.detail = this.product.detail


       if (pCategoryId === '0') {

      // 说明我当前的分类是一级列表
    } else {
      // 说明我当前的分类是二级列表
    }
  }
  // 获取一级分类的数据
  async componentDidMount () {
    const result = await category('0')
    const data = resultHandle(
      result,
      '获取一级列表数据成功',
      '一级列表数据获取失败，请重试！'
    )
    const options = data.map(item => {
      return {
        value: item._id,
        label: item.name,
        isLeaf: false
      }
    })
    this.setState({
      options
    })
  }
  loadData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    const { isLoading } = this.state
    targetOption.loading = isLoading // loading的效果
    // 根据我选择的这一项传递过来的id进行请求
    const selectId = targetOption.value
    this.setState({
      isLoading: true
    })
    const result = await getCategoryById(selectId)
    const data = resultHandle(
      result,
      '获取二级列表数据成功',
      '二级列表数据获取失败，请重试！'
    )
    if (data) {
      // data.map((item)=>{
      //   return {
      //     label: item.name, // 值
      //     value: 'dynamic1'
      //   }
      // })
      targetOption.children = [
        {
          label: data.name, // 值
          value: 'dynamic1'
        }
      ]
    }

    setTimeout(() => {
      this.setState({
        options: [...this.state.options],
        isLoading: false
      })
    }, 1000)
  }
  // 校验用户输入的价格,由于没有提供对应的校验规则，这里采用自定义校验规则
  validPrice = (rule, value, callback) => {
    if (value * 1 > 0) {
      callback()
    } else {
      callback('价格必须要大于0')
    }
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const { name, desc, price, imgs } = this.product
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }
    const title = (
      <div>
        <Icon
          type='arrow-left'
          style={{ color: 'green' }}
          onClick={() => {
            this.props.history.push('/product')
          }}
        />
        <span style={{ marginLeft: 15 }}>
          {this.product ? '修改商品' : '添加商品'}
        </span>
      </div>
    )
    return (
      <Card title={title}>
        <Form {...formItemLayout} style={{ padding: 20 }}>
          <Form.Item label='商品名称'>
            {getFieldDecorator('pName', {
              rules: [{ required: true, message: '请输入您的商品的名称' }],
              initialValue: name
            })(<Input />)}
          </Form.Item>
          <Form.Item label='商品描述'>
            {getFieldDecorator('desc', {
              rules: [{ required: true, message: '请描述您的商品' }],
              initialValue: desc
            })(<TextArea />)}
          </Form.Item>
          <Form.Item label='商品价格'>
            {getFieldDecorator('price', {
              rules: [
                { required: true, message: '请描述您的商品' },
                { validator: this.validPrice }
              ],
              initialValue: price
            })(<Input addonAfter='元' />)}
          </Form.Item>
          <Form.Item label='商品分类'>
            {getFieldDecorator('category', {
              rules: [{ required: true, message: '请选择您的商品分内' }]
            })(
              <Cascader
                options={this.state.options}
                loadData={this.loadData}
                onChange={this.onChange}
                changeOnSelect
              />
            )}
          </Form.Item>
          <Form.Item label='图片'>
            <PicturesWall ref={this.myRef} imgs={imgs} />
          </Form.Item>
          <Form.Item label='详情' wrapperCol={{ span: 18 }} labelCol={{ span: 6 }}>
            <RichTextEditor  ref={this.rich} detail={this.detail} />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12 ,offset:6}}>
            <Button
              type='primary'
              htmlType='submit'
              onClick={this.handleSubmit}
            >
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)
