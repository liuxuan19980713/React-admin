import React from 'react'
import ReactType from 'prop-types'
import { Upload, Icon, Modal } from 'antd'
import { deletePicture } from '../../api/index.js'
import resultHandle  from '../../config/result.js'
function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export default class PicturesWall extends React.Component {
  constructor (props) {
    super(props)
    const imgs = this.props.imgs
    var fileLists = []
    if (imgs && imgs.length > 0) {
      fileLists = imgs.map((img, i) => {
        return {
          uid: -i,
          name: img,
          status: 'done',
          url: 'http://localhost:5001/upload/' + img
        }
      })
    }
    this.state = {
      previewVisible: false, // 预览
      previewImage: '', // 预览的照片
      fileList: fileLists
    }
  }
  static propTypes = {
    imgs: ReactType.array
  }

  // 关闭预览
  handleCancel = () => this.setState({ previewVisible: false })
  // 处理点击预览的按钮
  handlePreview = async file => {
    // file是fileList数组中的一个成员
    console.log(file)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    })
  }
  getImgs = () => {
    return this.state.fileList.map(item => item.name)
  }
  // 处理上传的操作
  handleChange = async ({ fileList, file }) => {
    // fileList是当前上传的数组,file是我当前上传的这一项
    // uploading 表示正在上传 removed表示删除
   
    if (file.status === 'removed') {
      const name = file.name
      const result = await deletePicture(name)
      const data = resultHandle(result, '删除成功', '删除失败')
      if (data) {
        this.setState({
          fileList
        })
      }
    } else if (file.status === 'uploading') {
      console.log(fileList)
      console.log(file.status)
      this.setState({
        fileList
      })
    }
  }

  render () {
    const { previewVisible, previewImage, fileList } = this.state

    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>Upload</div>
      </div>
    )
    return (
      <div>
        <Upload
          action='/manage/img/upload' // 上传的地址
          listType='picture-card' // 图片显示的样式
          accept='image/*' // 支持上传的类型
          name='image' // 发到后台的文件参数名 要与接口文档对应上
          fileList={fileList} // 图片数组
          onPreview={this.handlePreview} // 图片的的预览按钮
          onChange={this.handleChange} // 上传的操作
        >
          {/* 最大上传8张 */}
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>

        {/* 预览框 */}
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
