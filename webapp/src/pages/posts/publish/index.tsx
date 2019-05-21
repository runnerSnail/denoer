import React from 'react'
import { Select, Input, Layout, Button, Form } from 'antd'
import Marked from 'marked'

import { Page } from 'components' // Nav
import { request } from 'utils'

import styles from './style.module.sass'

const { Content, Sider } = Layout
const { TextArea } = Input

interface State {
  content: string
}
class Publish extends React.Component<any, State> {

  state = {
    content: ''
  }

  componentDidMount () {
    request('22', { article_id: 1 }, { basePath: '/api/acticle' })
  }

  handleSubmit = (e) => {
    const { validateFields: V } = this.props.form
    e.preventDefault()
    V(async (err, values) => {
      if (!err) {
        console.log('values:', values)
        /** 根据是否有 article_id 判断是更新文章还是创建文章 */
        await request('create', { ...values }, { basePath: '/api/article' })
        await request('update', { ...values }, { basePath: '/api/article' })
      }
      console.log('err:', err)
    })
  }

  handleChange = (event: { target }) => {
    // console.log('props:', this.props)
    // console.log('event:', event)
    // console.log('zxc:', event.target.value, typeof event.target.value)
    this.setState({ content: Marked(event.target.value) })
  }

  _renderContent = () => {
    const { getFieldDecorator: D, getFieldsValue: G } = this.props.form
    return (<Content>
      <Form layout='inline'>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <span style={{ marginRight: 5 }}>选择板块:</span>
          <Form.Item>
            {D('type', {
              rules: [{ required: true, message: '板块类型必填' }]
            })(<Select
              style={{ width: 100 }}
            >
              <Select.Option value='client'>客户端</Select.Option>
              <Select.Option value='server'>服务端</Select.Option>
              <Select.Option value='answer'>问答</Select.Option>
              <Select.Option value='jd'>招聘</Select.Option>
            </Select>)}
          </Form.Item>
        </div>
        <Form.Item>
          {D('title', {
            rules: [{ required: true, message: '标题必填' }]
          })(<Input placeholder='标题字数 10 字以上' style={{ width: 500 }} />)}
        </Form.Item>
        <Form.Item>
          {D('img')(<Input placeholder='主图链接' style={{ width: 500 }} />)}
        </Form.Item>
        <div style={{ marginTop: 10 }}>
          <Form.Item>
            {D('content', {
              rules: [{ required: true, message: '内容必填' }]
            })(<TextArea onChange={this.handleChange} style={{ width: 800, height: '700px' }} />)}
          </Form.Item>
        </div>
          {/* <div dangerouslySetInnerHTML={{ __html: this.state.content }} style={{ flex: 1 }} /> */}
      </Form>
  </Content>
  )}

  _renderSider = () => (
    <Sider
      className='sider'
      style={{
        marginLeft: 50,
        backgroundColor: 'rgb(240, 242, 245)'
      }}
    >
      <div style={{ width: 300, height: 200, background: '#999', marginTop: 20, textAlign: 'center', lineHeight: '200px' }}>广告位</div>
      <div style={{ width: 300, height: 200, background: '#aaa', marginTop: 20, textAlign: 'center', lineHeight: '200px' }}>广告位</div>
      <div style={{ width: 300, height: 200, background: '#bbb', marginTop: 20, textAlign: 'center', lineHeight: '200px' }}>广告位</div>
    </Sider>
  )

  render () {
    return (
      <Page>
        <Layout className={styles['wrapper']}>
          {this._renderContent()}
          {this._renderSider()}
        </Layout>
        <div style={{ padding: '5px 50px' }}>
          <Button size='small' type='primary' onClick={this.handleSubmit}>发布</Button>
        </div>
      </Page>
    )
  }
}

export default Form.create()(Publish)