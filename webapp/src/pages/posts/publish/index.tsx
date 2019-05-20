import React from 'react'
import { Select, Input, Layout, Button, Form } from 'antd'
import Marked from 'marked'

import { Page } from 'components' // Nav

const { Content, Sider } = Layout
const { TextArea } = Input

interface State {
  content: string
}
@Form.create()
export default class Publish extends React.Component<any, State> {

  state = {
    content: ''
  }

  handleChange = (event: { target }) => {
    console.log('props:', this.props)
    console.log('event:', event)
    console.log('zxc:', event.target.value, typeof event.target.value)
    this.setState({ content: Marked(event.target.value) })
  }

  render () {
    return (
      <Page>
        <Layout style={{
          padding: '20px 50px',
          marginTop: 64,
          display: 'flex',
          flexDirection: 'row',
        }}
        >
          <Content>
            <span style={{ marginRight: 5 }}>选择板块:</span>
            <Select
              style={{ width: 100 }}
              // size='small'
            >
              <Select.Option value='client'>客户端</Select.Option>
              <Select.Option value='server'>服务端</Select.Option>
              <Select.Option value='answer'>问答</Select.Option>
              <Select.Option value='jd'>招聘</Select.Option>
            </Select>
            <Input placeholder='标题字数 10 字以上' style={{ marginTop: 10 }} />
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'row' }}>
              <TextArea onChange={this.handleChange} style={{ height: '1000px' }} />
              {/* <div dangerouslySetInnerHTML={{ __html: this.state.content }} style={{ flex: 1 }} /> */}
            </div>
          </Content>
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
        </Layout>
        <div style={{ padding: '10px 50px' }}>
        <Button size='small' type='primary'>提交</Button>
        </div>
      </Page>
    )
  }
}