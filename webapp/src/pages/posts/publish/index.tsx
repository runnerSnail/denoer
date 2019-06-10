import React from 'react'
import { Select, Input, Layout, Button, Form } from 'antd'
import Marked from 'marked'

import { Page } from 'components' // Nav
import { fetchPostsInfo, fetchPublishPosts, fetchUpdatePosts } from 'service/posts'

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
    /** 根据 article_id 查询文章详情 */
    fetchPostsInfo(122)
  }

  handleSubmit = (e) => {
    const { validateFields: V } = this.props.form
    const { content } = this.state
    if (!content) return
    e.preventDefault()
    V(async (err, values) => {
      if (!err) {
        console.log('values:', values)
        /** 根据是否有 article_id 判断是更新文章还是创建文章 */
        await fetchPublishPosts({...values, content, user_id: '123'})
        // await fetchUpdatePosts({ ...values })
      }
      console.log('err:', err)
    })
  }

  handleChange = (event: { target }) => { this.setState({ content: event.target.value }) }

  _renderContent = () => {
    const { getFieldDecorator: D, getFieldsValue: G } = this.props.form
    const { content = '' } = this.state
    console.log(content);
    let editSty = content
      ? { flex: 1, height: 'auto', marginRight: 20, minHeight: '500px', maxHeight: '700px' }
      : { width: '100%', height: 'auto', minHeight: '500px', maxHeight: '700px' }
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
              <Select.Option value='client'>文章</Select.Option>
              <Select.Option value='server'>分享</Select.Option>
              <Select.Option value='answer'>问答</Select.Option>
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
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'row', width: '100%' }}>
          <TextArea onChange={this.handleChange} style={editSty} />
          {
            content &&
            <div className={`markdown-body ${styles['md-wrapper']}`}>
              <div dangerouslySetInnerHTML={{ __html: Marked(this.state.content) }} />
            </div>
          }
        </div>
      </Form>
  </Content>
  )}

  _renderSider = () => (
    <Sider
      className={`sider ${styles['sider-container']}`}
    >
      {[1,2,3].map(e => (<div style={{ width: 300, height: 200, background: '#bbb', marginTop: 20, textAlign: 'center', lineHeight: '200px' }}>广告位</div>))}
    </Sider>
  )

  render () {
    return (
      <Page
        {...this.props}
      >
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