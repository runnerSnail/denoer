import React from 'react'
import { Select, Input, Layout, Button, Form } from 'antd'
import Marked from 'marked'
import { connect } from 'react-redux'

import { Page } from 'components' // Nav
import { fetchPostsInfo, fetchPublishPosts, fetchUpdatePosts } from 'service/posts'
import { TYPE_ARRAY, authUrl } from 'utils'

import styles from './style.module.sass'

const { Content, Sider } = Layout
const { TextArea } = Input

interface State {
  article_content: string,
  type?: number,
  title?: string,
  img?: string,
  loading?:boolean
}
class Publish extends React.Component<any, State> {

  state = {
    article_content: '',
    type: 1,
    title: '',
    img: '',
    loading: false
  }

  componentDidMount () {
    const { gitlab_id = '' } = this.props.userInfo
    /** 根据 article_id 查询文章详情 */
    // this._getData(116)
    if (!gitlab_id || gitlab_id === 'null') {
      window.location.href = `${authUrl}`
    }
  }

  _getData = async (article_id) => {
    const { result = {} } = await fetchPostsInfo(article_id)
    this.setState({ ...result })
  }

  handleSubmit = (e) => {
    const { validateFields: V } = this.props.form
    const { gitlab_id = '' } = this.props.userInfo
    const { article_content } = this.state
    if (!article_content) return
    e.preventDefault()
    V(async (err, values) => {
      if (!err) {
        console.log('values:', values)
        this.setState({ loading: true })
        try {
          /** 根据是否有 article_id 判断是更新文章还是创建文章 */
          await fetchPublishPosts({...values, article_content, gitlab_id})
          // const res = await fetchUpdatePosts({ ...values, article_content, article_id: '30' })
          this.setState({ loading: false })
        } catch (err) {
          this.setState({ loading: false })
        }
      }
      console.log('err:', err)
    })
  }

  handleChange = (event: { target }) => { this.setState({ article_content: event.target.value }) }

  _renderContent = () => {
    const { getFieldDecorator: D, getFieldsValue: G } = this.props.form
    const { article_content = '', type = '', title = '', img = '' } = this.state
    let editSty = article_content
      ? { flex: 1, height: 'auto', marginRight: 20, minHeight: '500px', maxHeight: '700px' }
      : { width: '100%', height: 'auto', minHeight: '500px', maxHeight: '700px' }
    return (<Content>
      <Form layout='inline'>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <span style={{ marginRight: 5 }}>选择板块:</span>
          <Form.Item>
            {D('type', {
              rules: [{ required: true, message: '板块类型必填' }],
              initialValue: type
            })(<Select
              style={{ width: 100 }}
            >
              {TYPE_ARRAY.map(({ key, value }) => (
                <Select.Option value={key}>{value || '-'}</Select.Option>
              ))}
            </Select>)}
          </Form.Item>
        </div>
        <Form.Item>
          {D('title', {
            rules: [{ required: true, message: '标题必填' }],
            initialValue: title

          })(<Input placeholder='标题字数 10 字以上' style={{ width: 500 }} />)}
        </Form.Item>
        <Form.Item>
          {D('img', {
            initialValue: img
          })(<Input placeholder='主图链接' style={{ width: 500 }} />)}
        </Form.Item>
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'row', width: '100%' }}>
          <TextArea onChange={this.handleChange} style={editSty} value={article_content} />
          {
            article_content &&
            <div className={`markdown-body ${styles['md-wrapper']}`}>
              <div dangerouslySetInnerHTML={{ __html: Marked(article_content) }} />
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
      <div style={{ width: 300, height: 200, marginTop: 20, backgroundImage: 'url(http://placem.at/people?w=300&h=200)' }} />
      <div style={{ width: 300, height: 200, marginTop: 20, backgroundImage: 'url(http://placem.at/place?w=300&h=200)' }} />
      <div style={{ width: 300, height: 200, marginTop: 20, backgroundImage: 'url(http://placem.at/things?w=300&h=200)' }} />
      {/* {[1,2,3].map(e => (<div style={{ width: 300, height: 200, background: '#bbb', marginTop: 20, textAlign: 'center', lineHeight: '200px' }}>广告位</div>))} */}
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
          <Button size='small' type='primary' onClick={this.handleSubmit} loading={this.state.loading}>发布</Button>
        </div>
      </Page>
    )
  }
}

const mapToState = ({ user }) => ({ userInfo: user })

export default connect(mapToState)(Form.create()(Publish))