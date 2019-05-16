import React from 'react'
import { Select, Input } from 'antd'

import { Nav, Page } from 'components'

interface State {
}

export default class Publish extends React.Component<any, State> {
  render () {
    return (
      <Page>
        {/* <Nav /> */}
        <div>
          <div style={{ marginTop: 70 }}>Publish Page</div>
          <Select
            style={{ width: 100 }}
            size='small'
          >
            <Select.Option value='client'>客户端</Select.Option>
            <Select.Option value='server'>服务端</Select.Option>
            <Select.Option value='answer'>问答</Select.Option>
            <Select.Option value='jd'>招聘</Select.Option>
          </Select>
          <Input placeholder='标题字数 10 字以上' />
        </div>
      </Page>
    )
  }
}